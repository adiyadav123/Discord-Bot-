const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Configuration, OpenAIApi } = require("openai");
const { open_api } = require('../../config.json')

const configuration = new Configuration({
    apiKey: open_api,
  });
  const openai = new OpenAIApi(configuration);
module.exports = {
    data: new SlashCommandBuilder()
    .setName('image-generator')
    .setDescription('generate an image for you')
    .addStringOption(option => option.setName('prompt').setDescription('the thing you want to generate the image').setRequired(true)),
    async execute(interaction){
        
        await interaction.deferReply();
        try{
            const promp = interaction.options.getString('prompt')
            const response = await openai.createImage({
                prompt: `${promp}`,
                n: 4,
                size: "1024x1024",
              });
              let image_url = response.data.data[0].url;
              let image_url_two = response.data.data[1].url;
              let img_three = response.data.data[2].url;
              let img_four = response.data.data[3].url;
            //   console.log(response.data);
              const embed = new EmbedBuilder()
              .setURL(`https://discord.gg/hCpYyjDVGD`)
              .setImage(`${image_url}`)
            //   
            const embed2 = new EmbedBuilder()
            .setURL(`https://discord.gg/hCpYyjDVGD`)
            .setImage(`${image_url_two}`)

            const embed3 = new EmbedBuilder()
            .setURL(`https://discord.gg/hCpYyjDVGD`)
            .setImage(`${img_three}`)

            const embed4 = new EmbedBuilder()
            .setURL(`https://discord.gg/hCpYyjDVGD`)
            .setImage(`${img_four}`)
            //   const embeds = [
            //     new EmbedBuilder().setImage(`${image_url}`),
            //     new EmbedBuilder().setImage(`${image_url_two}`),
                 // new EmbedBuilder().setURL("https://example.org/").setImage("https://picsum.photos/400/500"),
                 // new EmbedBuilder().setURL("https://example.org/").setImage("https://picsum.photos/400/400"),
            // ];

            const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button1')
            .setLabel(`Image 1`)
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('button2')
            .setLabel('Image2')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('button3')
            .setLabel('Image3')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('button4')
            .setLabel('Image 4')
            .setStyle(ButtonStyle.Primary)
        )

    
            await interaction.editReply({ embeds: [embed, embed2, embed3, embed4], components: [button] });

            const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async(i) => {
            if(i.customId === 'button1'){
                i.reply(`${image_url}`)
            }
            if(i.customId === 'button2'){
                i.reply(`${image_url_two}`)
            }
            if(i.customId === 'button3'){
                i.reply(`${img_three}`)
            }
            if(i.customId === 'button4'){
                i.reply(`${img_four}`)
            }
        })
        }catch(e){
            interaction.editReply(`Got an error while generating the image!\nPlease provide less decription of the image`)
        }
    }
}