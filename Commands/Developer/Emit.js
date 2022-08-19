const { GuildMember, WebhookClient, EmbedBuilder, AttachmentBuilder, SlashCommandBuilder, PermissionFlagsBits, CommandInteraction } = require("discord.js");

const Canvas = require("canvas");
require("dotenv").config();

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("emit")
        .setDescription("Emit guild member add")
        // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        ,
    /**
     * 
     * @param {GuildMember} oldMember 
     */
    execute(oldMember) {
        const { user, guild, member } = oldMember;

        const webhook = new WebhookClient({ url: process.env.GOODBYE_WEBHOOK_URL });
        
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL() })
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`**${member.displayName}** has left the community.`)
            .addFields([
                { name: `Server Member Since`, value: `📅 <t:${parseInt(member.joinedTimestamp / 1000)}:F>` },
                { name: `Latest Member Count`, value: `👥 **${guild.memberCount}** members in server.` },
            ])
            .setFooter({ text: `ID: ${user.id}` });

        webhook.send({ embeds: [embed] });
    }
}