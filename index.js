const { Client, IntentsBitField, Collection, Partials, } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();


const loadCommands = async () => {
  try {
      // Register global commands
      const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
          const command = require(`./commands/${file}`);
          await client.application.commands.create(command.data);
          client.commands.set(command.data.name, command);
      }
      console.log('Global commands registered successfully.');
  } catch (error) {
      console.error('Error registering global commands:', error);
  }
};

const loadListeners = async () => {
  try {
      // Register listeners
      const listenerFiles = fs.readdirSync('./listeners').filter(file => file.endsWith('.js'));
      for (const file of listenerFiles) {
          const listener = require(`./listeners/${file}`);
          listener(client);
      }
      console.log('Listeners registered successfully.');
  } catch (error) {
      console.error('Error registering listeners:', error);
  }
};

const loadContextMenuCommands = async () => {
  try {
      // Register context menu commands
      const contextMenuFiles = fs.readdirSync('./apps').filter(file => file.endsWith('.js'));
      for (const file of contextMenuFiles) {
          const command = require(`./apps/${file}`);
          await client.application.commands.create(command.data);
          client.commands.set(command.data.name, command);
      }
      console.log('Context menu commands registered successfully.');
  } catch (error) {
      console.error('Error registering context menu commands:', error);
  }
};

const resetCommands = async () => {
  try {
      // Delete all existing global commands
      const globalCommands = await client.application.commands.fetch();
      await Promise.all(globalCommands.map(command => command.delete()));
      console.log('All existing global commands deleted.');

      // Delete all existing context menu commands
      const contextMenuCommands = await client.application.commands.fetch();
      await Promise.all(contextMenuCommands.map(command => command.delete()));
      console.log('All existing context menu commands deleted.');

      // Load and register commands, listeners, and context menu commands
      await loadCommands();
      await loadListeners();
      await loadContextMenuCommands();
      console.log('All commands, listeners, and context menu commands registered successfully.');
  } catch (error) {
      console.error('Error resetting commands:', error);
  }
};

client.once('ready', async () => {
  console.log(`Bot is online! Logged in as ${client.user.username}`);
  client.user.setPresence({ activities: [{ name: '/help' }]});

  // Log the guilds where the bot is present
  client.guilds.cache.forEach(guild => {
      console.log(`Bot is present in: ${guild.name}`);
  });

  // Reset all commands and register them again
  await resetCommands();
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);