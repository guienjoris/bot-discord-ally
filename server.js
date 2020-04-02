const dotenv = require('dotenv').config({path: 'private.env'})
const discord = require('discord.js')

const bot = new discord.Client();
bot.on('ready',()=>{
    console.log("Je suis connecté!")
})

bot.on('message', message =>{
    let argsVote = message.content.split('!vote ')
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
        if(args[i] === 'GG'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/putain_il_est_fort_ce_con.mp3'));
        }
        if(args[i] === 'pignouf'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/pignouf.mp3'));
        }
        if(args[i] === 'roulettes'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/a_roulettes.mp3'));
        }
        if(args[i] === 'graal'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/incandescent.mp3'));
        }
        if(args[i] === 'femme'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/les_femmes_jaime_pas_ca_c_est_de_la_saloperie.mp3'));
        }
        if(args[i] === 'cons'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/cest_qui_tout_ces_cons.mp3'));
        }
    }
})

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur le serveur ' + member.displayName)
    }).catch(console.error)
  })

bot.login("")