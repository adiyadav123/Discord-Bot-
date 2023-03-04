const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const { open_api } = require('../../config.json')
const fs = require('fs');

const configuration = new Configuration({
    apiKey: open_api,
  });
  const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('merge-images')
    .setDescription('It will merge images'),
    // .addAttachmentOption(option => option.setName('image1').setDescription('image').setRequired(true))
    // .addAttachmentOption(option => option.setName('image2').setDescription('image 2').setRequired(true)),
    async execute(interaction){
        // await interaction.deferReply();
        try{
        //     const img1 = interaction.options.getAttachment('image1');
        // const img2 = interaction.options.getAttachment('image2');

        // const response = await openai.createImageEdit(
        //     fs.createReadStream(`${img1}`),
        //     fs.createReadStream(`${img2}`),
        //     "A sunlit indoor lounge area with a pool containing a flamingo",
        //     1,
        //     "1024x1024"
        //   );
        //   image_url = response.data.data[0].url;

        //   await interaction.editReply(`${image_url}`);
        await interaction.reply('under construction!')
        }catch(e){
            console.log(e)
        }
    }
}