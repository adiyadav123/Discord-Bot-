const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const vouchSchema = require('../../Schemas.js/vouch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vouch')
    .setDescription("vouch a user and increase his/her reputation")
    .addUserOption(option => option.setName('user').setDescription('the user you want to vouch for').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason which make you to vouch for this user').setRequired(true)),
    async execute(interaction, message){
        try{
            const { options, user, guild } = interaction;
        const users = options.getUser('user');
        const reason = options.getString('reason');
        vouchSchema.findOne({ Guild: guild.id, User: users.id }, async(err, data) => {
            if(err) throw err;
            if(!data){
                vouchSchema.create({
                    Guild: guild.id,
                    User: users.id,
                    Repu: 0
                });
            }
        });
        const Data = await vouchSchema.findOne({ Guild: guild.id, User: users.id });
        Data.Repu
         += 1;
        Data.save();
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Yay you vouch for ${users.username}`)
        .setDescription(`${user.username} vouched ${users.username}`)
        .addFields(
            { name: "Reason", value: `${reason}` }
        )
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}` })

        console.log(Data.Rep);
        await interaction.reply({ embeds: [embed] })
        }catch(e){
            console.log(e)
            await interaction.reply('Got an error xd')
        }
    }
}