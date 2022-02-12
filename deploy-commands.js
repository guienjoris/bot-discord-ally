const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("bernard")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("pignouf")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("merde")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("revolte")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("arthur")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("conne")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder().setName("cons").setDescription("Replies with gif!"),
  new SlashCommandBuilder().setName("con").setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("connard")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("merci")
    .setDescription("Replies with gif!"),
  new SlashCommandBuilder().setName("gg").setDescription("Replies with gif!"),
  new SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Replies with quiz!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
