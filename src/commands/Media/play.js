import axios from "axios";
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const playCommand = {
    name: "play",
    aliases: ["music", "song"],
    description: "Search and play music from YouTube",
    usage: "!play <song name>",
    category: "media",
    cooldown: 5000,
    minArgs: 1,
    requiredArgs: [{ name: "query", required: true }],

    run: async ({ args, reply, react, utils, senderName, isSelf, Aeonify, jid, messages, chat, botName }) => {
        const query = args.join(" ").trim();

        if (!query) {
            return reply("*Please provide a song name to search.*\n\n*Usage:* !play <song name>");
        }

        try {
            await react("🔍");

            const apiBaseUrl = `${process.env.API_BASE_URL}`;
            if (!apiBaseUrl) {
                console.error("API_BASE_URL environment variable is not set");
                return reply("*Configuration Error:* API endpoint not configured. Please contact the bot administrator.");
            }

            const apiUrl = `${apiBaseUrl.replace(/\/$/, '')}/dl/yt`;
            console.log(`Making request to: ${apiUrl}`);

            const { data } = await axios.get(apiUrl, {
                params: {
                    query,
                    format: 'mp3'
                },
                timeout: 60000,
                validateStatus: (status) => status < 500
            });

            if (!data || !data.success) {
                throw new Error(data?.message || 'Failed to process request');
            }

            await react("✨");

            await Aeonify.sendMessage(chat, {
                image: { url: data.video.thumbnail },
                caption: `*🎵 Music Found*\n\n` +
                      `*Title:* ${data.video.title}\n\n` +
                      `*Duration:* ${data.video.duration}\n` +
                      `*From:* YouTube by ${botName}`
            }, { quoted: messages });

            await Aeonify.sendMessage(
                chat,
                {
                    audio: { url: data.download.downloadUrl },
                    mimetype: 'audio/mpeg',
                    ptt: false
                },
                { quoted: messages }
            );

        } catch (error) {
            await react("❌");
            console.error("Play command error:", error.message);
            return reply("*Error:* Failed to process your request. Please try again later.");
        }
    }
};

export default playCommand; 