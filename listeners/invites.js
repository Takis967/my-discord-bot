module.exports = (client) => {
    const invitePattern = /discord\.(com|gg)\/\S+/i;

    // test
    const allowedUsers = ['USER ID 1', 'USER ID 2', 'USER ID 3', 'USER ID 4', 'USER ID 5']; // Replace with the IDs of users who are allowed to send invite links

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        if (invitePattern.test(message.content) && !allowedUsers.includes(message.author.id)) {
            try {
                await message.delete();
                await message.channel.send(`${message.author}, your message contained a Discord invite link and was removed. Please do not share invite links here.`);
                console.log(`Deleted invite link from ${message.author.tag}`);
            } catch (error) {
                console.error('Failed to delete message:', error);
            }
        }
    });

    client.on('messageUpdate', async (oldMessage, newMessage) => {
        if (newMessage.author.bot) return;

        if (invitePattern.test(newMessage.content) && !allowedUsers.includes(newMessage.author.id)) {
            try {
                await newMessage.delete();
                await newMessage.channel.send(`${newMessage.author}, your edited message contained a Discord invite link and was removed. Please do not share invite links here.`);
                console.log(`Deleted invite link from edited message by ${newMessage.author.tag}`);
            } catch (error) {
                console.error('Failed to delete edited message:', error);
            }
        }
    });
};
