const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js')
const levelSchema = require('../../Schemas.js/level');
const Canvacord = require('canvacord');

//  background image link -  https://i.ibb.co/q5rqfSW/canvacord.jpg

module.exports = {
    data: new SlashCommandBuilder()
    .setName('level')
    .setDescription("Rank of a user")
    .addUserOption(option => option.setName('user').setDescription('user! lol')),
    async execute(interaction){
        try{
            const { options, guild, user } = interaction;
        const Member = options.getUser('user') || user;
        const member = guild.members.cache.get(Member.id);

        const Data = await levelSchema.findOne({ Guild: guild.id, User: member.id });
        if(!Data) return await interaction.reply(`\`${member} has not gained any XP yet!\``);
        await interaction.deferReply();
        
        const Required = Data.Level * Data.Level * 20 + 20;

        const rank = new Canvacord.Rank()
        .setAvatar(member.displayAvatarURL({ forseStatic: true }))
        .setBackground("IMAGE", 'https://i.ibb.co/q5rqfSW/canvacord.jpg')
        .setCurrentXP(Data.XP)
        .setRequiredXP(Required)
        .setRank(1, "Rank", false)
        .setLevel(Data.Level, 'Level')
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)

        const Card = await rank.build();
        const attach = new AttachmentBuilder(Card, { name: 'rank.png' });

        const emb2 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`${member.user.username}'s rank/level`)

        await interaction.editReply({ embeds: [emb2], files: [attach] })
        }catch(err){
            console.log(err)
        }
     }
}