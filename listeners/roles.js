module.exports = (client) => {
    const channelId = 'CHANNEL ID HERE';
    const messageId = 'MESSAGE ID HERE';
    // If any user reacts to this specific channel on the specified message with the emoji listed under this he will get the role!
    const emojiRoleMap = {
        '🎶': 'ROLE ID HERE'
    }; //Add more emojis & role id's for more reaction roles!

    client.once('ready', async () => {
        try {
            // Fetch the specific channel
            const channel = await client.channels.fetch(channelId);
            if (!channel.isTextBased()) {
                console.error('Specified channel is not a text channel.');
                return;
            }

            // Fetch the specific message
            const targetMessage = await channel.messages.fetch(messageId);
            if (!targetMessage) {
                console.error('Message not found.');
                return;
            }

            // React with the specified emojis
            for (const emoji of Object.keys(emojiRoleMap)) {
                await targetMessage.react(emoji);
            }

            console.log('Reactions added to the message!');
        } catch (error) {
            console.error('Error reacting to the message:', error);
        }
    });

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.id !== messageId || user.bot) return;

        const roleId = emojiRoleMap[reaction.emoji.name];
        if (!roleId) return;

        try {
            const member = await reaction.message.guild.members.fetch(user.id);
            const role = await reaction.message.guild.roles.fetch(roleId);
            await member.roles.add(roleId);
            console.log(`Added role ${role.name} to user ${user.tag} for reaction ${reaction.emoji.name}`);
        } catch (error) {
            console.error(`Failed to add role ${roleId} to user ${user.tag}:`, error);
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.id !== messageId || user.bot) return;

        const roleId = emojiRoleMap[reaction.emoji.name];
        if (!roleId) return;

        try {
            const member = await reaction.message.guild.members.fetch(user.id);
            const role = await reaction.message.guild.roles.fetch(roleId);
            await member.roles.remove(roleId);
            console.log(`Removed role ${role.name} from user ${user.tag} for reaction ${reaction.emoji.name}`);
        } catch (error) {
            console.error(`Failed to remove role ${roleId} from user ${user.tag}:`, error);
        }
    });
};