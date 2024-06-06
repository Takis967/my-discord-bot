const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Delete messages')
    .addIntegerOption(option => option.setName('count').setDescription('Number of messages to delete (1-100)').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const count = interaction.options.getInteger('count');

    if (count < 1 || count > 100) {
      await interaction.reply('Please provide a valid count between 1 and 100.');
      return;
    }

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      await interaction.reply('You do not have permission to use this command.');
      return;
    }

    try {
      const channel = interaction.channel;
      const messages = await channel.messages.fetch({ limit: count });

      await channel.bulkDelete(messages);

      const embed = {
        title: 'Messages Deleted',
        description: `Deleted ${messages.size} messages.`,
        color: 0xA5A819, // Decimal representation of the color
        fields: [
          {
            name: 'Deleted By',
            value: interaction.user.tag,
            inline: true,
          },
          {
            name: 'Channel',
            value: channel.toString(),
            inline: true,
          },
        ],
      };

      await interaction.reply({ embeds: [embed] });

      const replyMessage = await interaction.fetchReply();
      setTimeout(() => {
        replyMessage.delete();
      }, 5000);
    } catch (error) {
      console.error('Failed to delete messages:', error);
      await interaction.reply('Failed to delete messages. Please try again later.');
    }
  },
};