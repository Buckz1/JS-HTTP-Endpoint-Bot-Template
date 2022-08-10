const { request, response } = require("express");
const { InteractionResponseType } = require('discord-interactions');
const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const hex = require("hex-to-64int"); 
hex.convert("d454ff");

module.exports = {
    data: {
        name: "dm",
        description: "...",
        type: ApplicationCommandType.ChatInput,
        options: [{
            name: "me",
            description: "...",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "get",
                description: "...",
                type: ApplicationCommandOptionType.User,
                required: true
            }]
        }]
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
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: ">>> **Testing /about me command**",
            }
        });
    },
};