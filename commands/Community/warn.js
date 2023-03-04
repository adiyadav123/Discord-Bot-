const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const warnSchema = require('../../Schemas.js/warn')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user!')
    .addUserOption(option => option.setName('user').setDescription("select a user you want to ban!").setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for warning!').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        const { options, guildId, user } = interaction;

        const users = options.getUser('user');
        const reason = options.getString('reason');
        const usertag = `${users.username}#${users.discriminator}`;

        warnSchema.findOne({GuildID: guildId, UserID: users, UserTag: users.tag}, async(err, data) => {
            if(err) throw err;

            if(!data){
                data = new warnSchema({
                    GuildID: guildId,
                    UserID: users,
                    UserTag: users.tag,
                    Content: [{
                        ExecuterId: user.id,
                        ExecuterTag: user.tag,
                        Reason: reason
                    }],
                });
            }else{
                const warnContent = {
                    GuildID: guildId,
                    UserID: users,
                    UserTag: usertag
                }
                data.Content.push(warnContent)
            }
            data.save();
        })

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: You have been **warned** in ${interaction.guild.name} | ${reason}`)

        const embed2 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`:white_check_mark: ${users} has been **warned** | ${reason}`)

        users.send({ embeds: [embed] }).catch(err => {
            return;
        })

        interaction.reply({ embeds: [embed2] })
    }
}