const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const warnSchema = require('../../Schemas.js/warn')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clearwarns')
    .setDescription('clear warns of a user!')
    .addUserOption(option => option.setName('user').setDescription("select a user you want to clear warnings!").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        const { options, guildId, user } = interaction;

        const users = options.getUser('user');
        const embed = new EmbedBuilder()

        warnSchema.findOne({GuildID: guildId, UserID: users, UserTag: users.tag}, async(err, data) => {
            if(err) throw err;

            if(data){
                await warnSchema.findOneAndDelete({ 
                    GuildID: guildId, UserID: users, UserTag: users.tag
                 })

                 embed.setColor("Green")
                 .setDescription(`:white_check_mark: Warnings of \`${users.tag}\` has been succesfully removed!`);

                 interaction.reply({ embeds: [embed] })
            }else{
                interaction.reply({ content: `${users.tag} has no warnings to be cleared!`, ephemeral: true })
            }
        })
    }
}