const dotenv = require('dotenv').config({path: 'private.env'})
const discord = require('discord.js')
const quiz = require('./quiz/quiz.json');
const item = quiz[Math.floor(Math.random() * quiz.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
const bot = new discord.Client();
bot.on('ready',()=>{
    console.log("Je suis connecté!")
})




bot.on('message', message =>{
    let argsVote = message.content.split('!vote ')
    let argsMath = message.content.split('!calc ')
    let args = message.content.split(' ');
    if(message.content === "!quiz"){
        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} a la bonne réponse!`);
                })
                .catch(collected => {
                    message.channel.send('Personne a trouvé la réponse dans le temps imparti');
                });
        });
    }
    if(message.content === `!vote ${argsVote[1]}`){
        message.react('👍')
        .then(()=>{message.react('👎' )})
        .then(()=>{message.pin()})
        .catch(console.error)     
    }
    if(message.content === `!command` ){
        message.reply(`\`!vote + votre question\` pour voter 
        \`ping\` pour avoir un pong!
        \`!calc + votre calcul (ex: 50+50/2*5+150+150.5)\` pour calculer! 
        \`!command gif \` pour avoir les commandes des gifs
        \`!quiz \` pour lancer une question aléatoire
        `)
        .catch(console.error) 
    }
    if(message.content === "!command gif"){
        message.reply(
            "\n`GG ou Gg`,\n`pignouf`,\n`merde`,\n`révolte ou revolte`,\n`arthur ou Arthur`, \n`conne`,\n`cons`,\n`con`,\n`connard ou connards`,\n`merci ou Merci ou MERCI`,\n`\\o/`"
        )
        .catch(console.error) 

    }
    if(message.content === "!clean"){
        message.channel.bulkDelete(100)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error)
    }
    for(let i=0;i< args.length;i++){
        if(args[i]=== 'ping'){
            message.reply('pong !')
            .catch(console.error) 
        }
        if(args[i] === 'GG' || args[i] === 'Gg'){
            message.channel.send(new discord.MessageAttachment('https://cdn.discordapp.com/attachments/417716629036728320/695255236553474049/00029.gif'))
            .catch(console.error) 
        }
        if(args[i] === 'pignouf' || args[i] === 'Pignouf'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/pignouf.gif'))
            .catch(console.error) 
        }
        if(args[i] === 'merde' || args[i] === 'Merde'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/merde.gif'))
            .catch(console.error)
        }
        if(args[i] === 'révolte' || args[i]=== "revolte"){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/revolte.gif'))
            .catch(console.error)
        }
        if(args[i] === 'arthur' || args[i] === 'Arthur'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/arthour.gif'))
            .catch(console.error)
        }
        if(args[i] === 'conne'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/conne.gif'))
            .catch(console.error)
        }
        if(args[i] === 'cons'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/cons.gif'))
            .catch(console.error)
        }
        if(args[i] === 'con'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/con.gif'))
            .catch(console.error)
        }
        if(args[i] === 'connard' || args[i] === 'connards'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/connard.gif'))
            .catch(console.error)
        }
        if(args[i] === 'merci'|| args[i] === 'Merci' || args[i] === 'MERCI'){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/merci.gif'))
            .catch(console.error)
        }
        if(args[i] === "\\o/"){
            message.channel.send(new discord.MessageAttachment('./Projets/JS-Vanilla/bot-discord-lotr/media/woohoo.gif'))
            .catch(console.error)
        }
    }
    if(message.content === `!calc ${argsMath[1]}`){
        message.reply(`\`${eval(argsMath[1])}\``)
        .catch(console.error) 
    }
})

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur le serveur ' + member.displayName)
    }).catch(console.error)
  })

bot.login("Njk0ODQ2ODEwNTg5NjI2NDMw.XoRk9g.aN6VlWZ8AZQZIw-KhFkKzbqoK-E")