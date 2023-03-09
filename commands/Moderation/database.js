const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const testSchema = require('../../Schemas.js/test')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mongo-test')
    .setDescription('mongodb-test')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        testSchema.findOne({ GuildID: interaction.guild.id, UserID: interaction.user.id},  async(err, data) => {
            if(err) throw err;

            if(!data){
                testSchema.create({
                    GuildID: interaction.guild.id,
                    UserID: interaction.user.id
                })
            }
            if(data){
                console.log(data)
            }
        })
    }
}

