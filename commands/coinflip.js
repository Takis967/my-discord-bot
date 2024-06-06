const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin to decide who goes first.'),

    async execute(interaction) {
        const sides = [
          { name: 'Heads', image: 'https://cdn.discordapp.com/attachments/541982487622975501/1089596151843520594/heads.png' },
          { name: 'Tails', image: 'https://cdn.discordapp.com/attachments/541982487622975501/1089596126610604132/tails.png' },
        ];
        const result = sides[Math.floor(Math.random() * sides.length)];
    const embed = new EmbedBuilder()
    .setTitle('Coinflip')
    .setDescription(`You flipped **${result.name}**!`)
    .setThumbnail(result.image)
    .setColor('#A5A819');

    await interaction.reply({ embeds: [embed] });
  },
};