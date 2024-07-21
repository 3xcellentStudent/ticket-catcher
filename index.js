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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatIds = void 0;
const express_1 = __importDefault(require("express"));
const reader_1 = __importDefault(require("./services/reader/reader"));
const node_cron_1 = __importDefault(require("node-cron"));
const telegraf_1 = require("./services/telegraf/telegraf");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
exports.chatIds = [];
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Server was started on PORT: ${PORT}...`);
        telegraf_1.bot.launch()
            .then(() => console.log('Bot started successfully...'))
            .catch((err) => console.error(`Failed to start bot: ${err} !`));
        telegraf_1.bot.start(telegraf_1.botStart);
        node_cron_1.default.schedule("* * * * *", () => {
            if (exports.chatIds.length)
                runTask();
            else
                return;
        });
    }
    catch (err) {
        console.error(err);
    }
}));
function runTask() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Task is running...");
        const message = yield (0, reader_1.default)();
        console.log(message);
        if (message)
            (0, telegraf_1.sendMessageToAllChats)(message);
        else
            return;
    });
}
// 6079250820:AAFvWarUzWirb90l9HhnMKvUivIMLLTp8jg
