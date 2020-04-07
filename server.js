const dotenv = require('dotenv').config({path: 'private.env'})
const discord = require('discord.js')

const bot = new discord.Client();
bot.on('ready',()=>{
    console.log("Je suis connecté!")
})
function calc(exp){
    return new Function('return' + exp)();
}
bot.on('message', message =>{
    let argsVote = message.content.split('!vote ')
    let argsMath = message.content.split('!calc ')
    let args = message.content.split(' ');
    if(message.content === `!vote ${argsVote[1]}`){
        message.react('👍')
        .then(()=>{message.react('👎' )})
        .then(()=>{message.pin()})     
    }
    if(message.content === `!help bot-ally` ){
        message.reply(`\`!vote + votre question\` pour voter 
        \`ping\` pour avoir un pong! `)
    }
    if(message.content=== 'ping'){
        message.reply('pong !')
    }
    if(message.content === "!clean"){
        message.channel.bulkDelete(100)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error)
    }
    for(let i=0;i< args.length;i++){
        if(args[i] === 'GG' || args[i] === 'Gg'){
            message.channel.send(new discord.MessageAttachment('https://cdn.discordapp.com/attachments/417716629036728320/695255236553474049/00029.gif'));
        }
        if(args[i] === 'pignouf'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/pignouf.gif'));
        }
        if(args[i] === 'merde'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/merde.gif'));
        }
        if(args[i] === 'révolte'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/revolte.gif'));
        }
        if(args[i] === 'arthur' || args[i] === 'Arthur'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/arthour.gif'));
        }
        if(args[i] === 'conne'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/conne.gif'));
        }
        if(args[i] === 'cons'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/cons.gif'));
        }
        if(args[i] === 'con'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/con.gif'));
        }
        if(args[i] === 'connard'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/connard.gif'));
        }
        if(args[i] === 'merci'||args[i] === 'Merci' || args[i] === 'MERCI'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/merci.gif'));
        }
        if(args[i] === "\\o/"){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/woohoo.gif'));
        }
    }
    if(message.content === `!calc ${argsMath[1]}`){
        message.reply(eval(argsMath[1]));
    }
})

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur le serveur ' + member.displayName)
    }).catch(console.error)
  })

bot.login("")