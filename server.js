const dotenv = require("dotenv").config({ path: ".env" });
const axios = require("axios").default;
const convert = require("xml-js");
const iconvlite = require("iconv-lite");
const { token } = require("./config.json");

const discord = require("discord.js");
const { Client, Intents } = require("discord.js");

const quiz = require("./quiz/quiz.json");
const quote = require("./quiz/quotes.json");
let item = quiz[Math.floor(Math.random() * quiz.length)];
let itemQuote = quote.quotes[Math.floor(Math.random() * quote.quotes.length)];
const filter = (response) => {
  return item.answers.some(
    (answer) => answer.toLowerCase() === response.content.toLowerCase()
  );
};

const bot = new discord.Client({
  intents: [Intents.FLAGS.GUILDS],
});
bot.once("ready", () => {
  console.log("Je suis connecté!");
});

function rebootQuiz() {
  item = quiz[Math.floor(Math.random() * quiz.length)];
}
function randomQuote() {
  itemQuote = quote.quotes[Math.floor(Math.random() * quote.quotes.length)];
}

bot.on("interactionCreate", async (interaction) => {
  console.log({ interaction });

  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  if (commandName === "test") {
    await interaction.reply("Pong!");
  }
  if (commandName === "quiz") {
    interaction.reply(item.question, { fetchReply: true }).then(() => {
      interaction.channel
        .awaitMessages({ filter, max: 1, time: 30000, errors: ["time"] })
        .then((collected) => {
          interaction.followUp(
            `${collected.first().author} a la bonne réponse!`
          );
        })
        .catch((collected) => {
          interaction.followUp(
            "Personne a donner de réponse dans le temps imparti"
          );
        });
    });
  }
});
/* bot.on("message", (message) => {
  let argsVote = message.content.split("!vote ");
  let argsMath = message.content.split("!calc ");
  const argsStats = message.content.split("!data ")[1];
  let args = message.content.split(" ");
  if (message.content === "!quiz") {
    message.channel.send(item.question).then(() => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
        .then((collected) => {
          message.channel
            .send(
              `${collected.first().author} a la bonne réponse avec ${
                item.answers[0]
              } !`
            )
            .then(() => {
              rebootQuiz();
            });
        })
        .catch((collected) => {
          message.channel.send(
            "Personne a trouvé la réponse dans le temps imparti"
          );
        });
    });
  }
  if (message.content === `!data ${argsStats}`) {
    axios({
      method: "get",
      url: "https://s149-fr.ogame.gameforge.com/api/players.xml",
      responseType: "text",
      accept: "application/xml",
    }).then(
      (data) => {
        const jsonObj = convert.xml2js(data.data, {
          compact: true,
          ignoreDoctype: true,
          attributesKey: "attributes",
        });
        const player = jsonObj.players.player.find(
          (e) => e.attributes.name === argsStats
        );
        const id = player.attributes.id;
        axios({
          method: "get",
          url: `https://s149-fr.ogame.gameforge.com/api/playerData.xml?id=${id}`,
          responseType: "text",
          accept: "application/xml",
        }).then(
          (stats) => {
            const jsonObjStats = convert.xml2js(stats.data, {
              compact: true,
              ignoreDoctype: true,
              attributesKey: "attributes",
            });
            const arrayPlanet = jsonObjStats?.playerData?.planets?.planet.map(
              (item) => {
                return {
                  name: item?.attributes?.name,
                  coords: item?.attributes?.coords,
                  moonName: item?.moon?.attributes?.name,
                  moonSize: item?.moon?.attributes?.size,
                };
              }
            );
            const formatObject = {
              points: {
                totalPoints: {
                  points:
                    jsonObjStats.playerData.positions.position[0].attributes.score.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    ),
                  classements: `${jsonObjStats.playerData.positions.position[0]._text} ème`,
                },
                economie: {
                  points:
                    jsonObjStats.playerData.positions.position[1].attributes.score.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    ),
                  classements: `${jsonObjStats.playerData.positions.position[1]._text} ème`,
                },
                recherche: {
                  points:
                    jsonObjStats.playerData.positions.position[2].attributes.score.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    ),
                  classements: `${jsonObjStats.playerData.positions.position[2]._text} ème`,
                },
                militaire: {
                  points:
                    jsonObjStats.playerData.positions.position[3].attributes.score.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    ),
                  classements: `${jsonObjStats.playerData.positions.position[3]._text} ème`,
                },
              },
              planets: arrayPlanet,
            };
            message.reply(require("util").inspect(formatObject), {
              split: true,
              code: true,
            });
          },
          (err) => {
            console.log(err);

            message.reply(
              "Il y a eu une erreur vérifiez que le pseudo soit bon"
            );
          }
        );
      },
      (err) => {
        console.log(err);
        message.reply("Il y a eu une erreur vérifiez que le pseudo soit bon");
      }
    );
  }

  if (message.content === "!quiz ignore") {
    rebootQuiz();
  }
  if (message.content === "!quote") {
    console.log(itemQuote);
    message
      .reply(`${itemQuote.quote.text} \n - ${itemQuote.author} -`)
      .then(() => {
        return randomQuote();
      })
      .catch(console.error);
  }
  if (message.content === `!vote ${argsVote[1]}`) {
    message
      .react("👍")
      .then(() => {
        message.react("👎");
      })
      .then(() => {
        message.pin();
      })
      .catch(console.error);
  }
  if (message.content === `!command`) {
    message
      .reply(
        `\`!vote + votre question\` pour voter \n
        \`ping\` pour avoir un pong! \n
        \`!calc + votre calcul (ex: 50+50/2*5+150+150.5)\` pour calculer! \n
        \`!command gif \` pour avoir les commandes des gifs \n
        \`!quiz \` pour lancer une question aléatoire \n
        \`!quote \` pour avoir une quote de manière aléatoire \n
        \`!data + pseudo \` pour avoir les datas d'un joueur \n
        `
      )
      .catch(console.error);
  }
  if (message.content === "!command gif") {
    message
      .reply(
        "\n`!GG ou !Gg`,\n`!pignouf`,\n`!merde`,\n`!révolte ou !revolte`,\n`!arthur ou !Arthur`, \n`!conne`,\n`!cons`,\n`!con`,\n`!connard ou !connards`,\n`!merci ou !Merci ou !MERCI`,\n`!\\o/`"
      )
      .catch(console.error);
  }
  if (message.content === "!clean") {
    message.channel
      .bulkDelete(100)
      .then((messages) => console.log(`Bulk deleted ${messages.size} messages`))
      .catch(console.error);
  }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "ping") {
      message.reply("pong !").catch(console.error);
    }
    if (args[i].toLowerCase() === "!gg") {
      message.channel
        .send(
          new discord.MessageAttachment(
            "https://cdn.discordapp.com/attachments/417716629036728320/695255236553474049/00029.gif"
          )
        )
        .catch(console.error);
    }
    if (args[i].toLowerCase() === "!pignouf") {
      message.channel
        .send(new discord.MessageAttachment("./media/pignouf.gif"))
        .catch(console.error);
    }
    if (args[i].toLowerCase() === "!merde") {
      message.channel
        .send(new discord.MessageAttachment("./media/merde.gif"))
        .catch(console.error);
    }
    if (
      args[i].toLowerCase() === "!révolte" ||
      args[i].toLowerCase() === "!revolte"
    ) {
      message.channel
        .send(new discord.MessageAttachment("./media/revolte.gif"))
        .catch(console.error);
    }
    if (args[i].toLowerCase() === "!arthur") {
      message.channel
        .send(new discord.MessageAttachment("./media/arthour.gif"))
        .catch(console.error);
    }
    if (args[i] === "!conne") {
      message.channel
        .send(new discord.MessageAttachment("./media/conne.gif"))
        .catch(console.error);
    }
    if (args[i] === "!cons") {
      message.channel
        .send(new discord.MessageAttachment("./media/cons.gif"))
        .catch(console.error);
    }
    if (args[i] === "!con") {
      message.channel
        .send(new discord.MessageAttachment("./media/con.gif"))
        .catch(console.error);
    }
    if (args[i] === "!connard" || args[i] === "!connards") {
      message.channel
        .send(new discord.MessageAttachment("./media/connard.gif"))
        .catch(console.error);
    }
    if (args[i] === "!merci" || args[i] === "!Merci" || args[i] === "!MERCI") {
      message.channel
        .send(new discord.MessageAttachment("./media/merci.gif"))
        .catch(console.error);
    }
    if (args[i] === "!\\o/") {
      message.channel
        .send(new discord.MessageAttachment("./media/woohoo.gif"))
        .catch(console.error);
    }
    if (args[i].toLowerCase() === "!bernard") {
      message.channel
        .send(new discord.MessageAttachment("./media/bernard.gif"))
        .catch(console.error);
    }
  }
  if (message.content === `!calc ${argsMath[1]}`) {
    message.reply(`\`${eval(argsMath[1])}\``).catch(console.error);
  }
});
 */
bot.on("guildMemberAdd", (member) => {
  member
    .createDM()
    .then((channel) => {
      return channel.send("Bienvenue sur le serveur " + member.displayName);
    })
    .catch(console.error);
});

bot.login(token);
