const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const warnSchema = require('../../Schemas.js/warn')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('Warnings of a user!')
    .addUserOption(option => option.setName('user').setDescription("select a user you want to check warnings!").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        const { options, guildId, user } = interaction;

        const users = options.getUser('user');
        const embed = new EmbedBuilder()
        const nowarns = new EmbedBuilder()

        warnSchema.findOne({GuildID: guildId, UserID: users, UserTag: users.tag}, async(err, data) => {
            if(err) throw err;

            if(data){
                embed.setColor("Green")
                .setDescription(`:white_check_mark: ${users.tag}'s warnings \n ${data.Content.map(
                    (w, i) => 
                        `
                        **Warnings**: ${i + 1}
                        **Warning Moderator**: ${w.ExecuterTag}
                        **Warn Reason** : ${w.Reason}
                        `
                    
                ).join(`-`)}`)

                interaction.reply({ embeds: [embed] })
            }else{
                nowarns.setColor("Green")
                .setDescription(`:white_check_mark: ${users.tag} has **0** warns!`)

                interaction.reply({ embeds: [nowarns] })
            }
        })
    }
}