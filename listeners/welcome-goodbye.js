const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    const welcomeChannelId = 'Welcome Channel Id'; // Replace with the ID of your welcome channel
    const goodbyeChannelId = 'Goodbye Channel Id'; // Replace with the ID of your goodbye channel
    const welcomeRoleIds = ['role id 1', 'role id 2']; // Replace with the IDs of your welcome roles

    client.on('guildMemberAdd', async (member) => {
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
        if (!welcomeChannel) return;

        const embed = new EmbedBuilder()
            .setColor('#A5A819')
            .setTitle("Welcome to Peter's Private Server!")
            .setDescription(`Welcome ${member}! We're glad to have you here.\nMake sure to read server <#0000000000000000>.\nAnd go to <#0000000000000000> and grab free access for DJ role!`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        welcomeChannel.send({ embeds: [embed] });

        // Add welcome roles to the member
        try {
            for (const roleId of welcomeRoleIds) {
                const role = member.guild.roles.cache.get(roleId);
                if (role) await member.roles.add(role);
            }
        } catch (error) {
            console.error('Failed to add welcome roles:', error);
        }
    });

    client.on('guildMemberRemove', async (member) => {
        const goodbyeChannel = member.guild.channels.cache.get(goodbyeChannelId);
        if (!goodbyeChannel) return;

        const embed = new EmbedBuilder()
            .setColor('#A5A819')
            .setTitle('Goodbye :(')
            .setDescription(`${member.user.tag} Just left!\nLet me scratch my testicles pretty quick.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setTimestamp();

        goodbyeChannel.send({ embeds: [embed] });
    });
};
