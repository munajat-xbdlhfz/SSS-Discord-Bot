const { GuildMember ,EmbedBuilder, WebhookClient } =  require("discord.js");

require("dotenv").config();

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} oldMember 
     */
    execute(oldMember) {
        const { user, guild} = oldMember;

        const webhook = new WebhookClient({ url: process.env.GOODBYE_WEBHOOK_URL })
        
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL() })
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`**${oldMember.displayName}** has left the community.`)
            .addFields([
                { name: `Server Member Since`, value: `📅 <t:${parseInt(oldMember.joinedTimestamp / 1000)}:F>` },
                { name: `Latest Member Count`, value: `👥 **${guild.memberCount}** members in server.` },
            ])
            .setFooter({ text: `ID: ${user.id}` });

        webhook.send({ embeds: [embed] });
    }
}