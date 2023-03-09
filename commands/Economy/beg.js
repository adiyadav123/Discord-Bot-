const { SlashCommandBuilder, EmbedBuider, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const ecoSchema = require('../../Schemas.js/eco')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('beg')
    .setDescription('beg for money'),
    async execute(interaction){
        const { user, guild } = interaction;

        let Data = await ecoSchema.findOne({ Guild: guild.id, User: user.id });
        
        let negative = Math.round((Math.random() * -250) - 10)
        let positive = Math.round((Math.random() * 300) + 10)

        const posN = [negative, positive];
        const amount = Math.round(( Math.random() * posN.length ));
        const value = posN[amount];

        if(!value) return interaction.reply({ content: `No money for you!` });

        if(Data){
           Data.Wallet += value;
           await Data.save();
        }
        if(value > 0){
            const po = [
                "Congratulations! You've been awarded  for your successful begging attempt. You got ",
                "Wow, you're really good at this begging thing. You begged ",
                "Nice you are good at this. You got ",
                "Man I can't believe you are a successful begger! and you got ",
                "Impressive begging technique!, what's your secret behind this? and you got ",
                "It's not the most honorable way to earn coins, but I guess it works and you got "
            ]
            const pora = Math.floor(Math.random() * po.length)
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Begger\'s association')
            .setDescription('Your beg result')
            .addFields(
                { name: 'Beg result', value: `${po[pora]} ${value} 🍌` }
            )
            await interaction.reply({ embeds: [embed] })
        }else{
            const ne = [
                "You left your wallet on the bench and lost",
                "You were got caught by police when you were begging from terrorists for some money and lost",
                "Your bank  got hacked and took",
                "You got mugged and lost",
            ]
            const neg = Math.floor(Math.random() * ne.length);
            const strValue = `${value}`;

            const embe = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Begger's association")
            .addFields(
                { name: 'Beg Result', value: `${ne[neg]} ${strValue} 🍌` }
            )

            await interaction.reply({ embeds: [embe] });
        }
    }
}