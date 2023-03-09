const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Configuration, OpenAIApi } = require("openai");
const { open_api } = require('../../config.json')

const configuration = new Configuration({
    apiKey: open_api,
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription("Ask questions to chatgpt!")
    .addStringOption(option => option.setName('question').setDescription('the question you want to ask!').setRequired(true)),

    async execute(interaction){

        await interaction.deferReply();

        const question = interaction.options.getString('question');

	try{
		const openai = new OpenAIApi(configuration);
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `${question}`,
			temperature: 0.5,
			max_tokens: 2048
		  });
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`\`\`\`${response.data.choices[0].text}\`\`\``)

          await interaction.editReply({ embeds: [embed] })

	}catch(e){
		return await interaction.editReply({ content: `Request failed with status code **${e.response.status}** `, ephemeral: true })
	}
    }
}