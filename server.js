const dotenv = require('dotenv').config({path: 'private.env'})
const discord = require('discord.js')

const bot = new discord.Client();
bot.on('ready',()=>{
    console.log("Je suis connecté!")
})

bot.on('message', message =>{
    let args = message.content.split('!vote ')
    if(message.content === `!vote ${args[1]}`){
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
})

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur le serveur ' + member.displayName)
    }).catch(console.error)
  })

bot.login(`${process.env.DISCORD_TOKEN}`)