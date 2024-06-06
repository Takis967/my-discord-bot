const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionsBitField } = require('discord.js');

const data = new ContextMenuCommandBuilder()
    .setName('Unmute')
    .setType(ApplicationCommandType.User);

module.exports = {
    data: data,
    async execute(interaction) {
        try {
            if (!interaction.isContextMenuCommand() || interaction.commandName !== data.name) return;

            // Check if the user has admin permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            }

            // Get the user from the interaction
            const user = await interaction.guild.members.fetch(interaction.targetId);

            if (!user) {
                return interaction.reply({ content: 'The specified user is not in this server.', ephemeral: true });
            }

            // Role IDs to add to the user (replace these with actual role IDs)
            const roleIdsToAdd = ['MEMBER ROLE 1', 'ROLE 2 (REMOVE OR ADD MORE IF YOU LIKE!)']; // Replace with actual role IDs

            // Remove all roles from the user except the ones specified to add
            await user.roles.set(roleIdsToAdd);
            await interaction.reply({ content: `Successfully unmuted ${user.user.tag}.`, ephemeral: true });
            console.log(`Admin: ${interaction.user.tag} unmuted ${user.user.tag}`);
        } catch (error) {
            console.error('Error executing unmute command:', error);
            await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
    },
};