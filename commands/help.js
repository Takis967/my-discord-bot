const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays help information'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Command List')
      .setDescription('Here is a list of all commands:')
      .setColor('#A5A819') // Hex color code (e.g., purple)

    embed.addFields(
      { name: ' ', value: ' ' },
      { name: '/coinflip', value: 'Flip a coin to decide who goes first.' }
    );

    await interaction.reply({ embeds: [embed] });
  },
};