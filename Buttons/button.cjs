const { request, response } = require("express");
const { InteractionResponseType, InteractionResponseFlags } = require('discord-interactions');
const hex = require("hex-to-64int"); 
console.log(hex.convert("d454ff"))
module.exports = {
    data: {
        custom_id: "button",
    },
    /**
     * @param { request } req
     * @param { response } res
     */
    async execute(req, res) {

        const { avatar, id, username, discriminator } = req.body.member.user;
        const { application_id, channel_id, guild_id } = req.body;
        const messageId = req.body.id;

        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, // Reply to the buttons message
            data: {
                content: ">>> **Testing button ephemeral messages**",
                embeds: [
                    {
                        description: "WORKED!",
                        color: hex.convert("d454ff"),
                    }
                ],
                flags: InteractionResponseFlags.EPHEMERAL,
            },

        });
    },
};