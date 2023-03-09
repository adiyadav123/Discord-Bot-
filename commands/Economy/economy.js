const { SlashCommandBuilder, EmbedBuider, Client, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const ecoSchema = require('../../Schemas.js/eco')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setaccount')
    .setDescription('set your economy account!'),
    async execute(interaction){
        const { user, guild } = interaction;

        let Data = await ecoSchema.findOne({ Guild: guild.id, User: user.id });
        
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Account`)
        .setDescription('Choose your option!')
        .addFields({ name: 'Create', value: 'Create your account!' })
        .addFields({ name: 'Delete', value: 'Delete your account!' })

        const embed2 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Account Created`)
        .setDescription('Created your account')
        .addFields({ name: 'Success', value: 'your account has been succesfully created and 🍌1000 Luncoin has been added to your wallet' })
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Account Deleted`)
        .setDescription('Deleted your account your account')
        .addFields({ name: 'Success', value: 'your account has been succesfully deleted ' })
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('page1')
            .setEmoji('✅')
            .setLabel('Create')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('page2')
            .setEmoji("❌")
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger)
        )

        const message = await interaction.reply({ embeds: [embed], components: [button] })
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {
            if(i.customId === 'page1'){
                if(i.user.id !== interaction.user.id){
                   return  i.reply({ content: `Only ${interaction.user} can use this button`, ephemeral: true });
                }

                Data = new ecoSchema({
                    Guild: guild.id,
                    User: user.id,
                    Bank: 0,
                    Wallet: 1000
                })
                await Data.save();
                await i.update({ embeds: [embed2], components: [] })
            }
            if(i.customId === 'page2'){
                if(i.user.id !== interaction.user.id){
                   return  i.reply({ content: `Only ${interaction.user} can use this button`, ephemeral: true });
                }

                try{
                    Data.remove();
                }catch(e){
                    console.log(e);
                }
                await i.update({ embeds: [embed3], components: [] })
            }
        })
    }
}