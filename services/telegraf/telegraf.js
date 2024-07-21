"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.sendMessageToAllChats = exports.botStart = void 0;
const telegraf_1 = require("telegraf");
const __1 = require("../..");
const bot = new telegraf_1.Telegraf('6079250820:AAFvWarUzWirb90l9HhnMKvUivIMLLTp8jg');
exports.bot = bot;
function botStart(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chatId = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id;
        if (!chatId) {
            ctx.reply(`Something went wrong :(`);
            return;
        }
        else {
            const message = `Your chat ID is ${chatId}`;
            __1.chatIds.push(chatId);
            ctx.reply(message);
            console.log(message);
            return chatId;
        }
    });
}
exports.botStart = botStart;
function sendMessageToAllChats(message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(__1.chatIds);
        try {
            for (const chatId of __1.chatIds) {
                const response = yield bot.telegram.sendMessage(chatId, message);
                console.log(response);
                console.log(`Bot sent message to chat #${chatId}!`);
            }
            console.log('All messages sent to Telegram!');
        }
        catch (error) {
            console.error('Error sending message to Telegram:', error);
        }
    });
}
exports.sendMessageToAllChats = sendMessageToAllChats;
