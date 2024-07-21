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
const playwright_1 = require("playwright");
const url = "https://www.kiwi.com/ru/search/results/%D0%B1%D0%BE%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F,%D1%80%D1%83%D0%BC%D1%8B%D0%BD%D0%B8%D1%8F,%D1%81%D0%B5%D1%80%D0%B1%D0%B8%D1%8F/%D0%BF%D0%B0%D1%80%D0%B8%D0%B6-%D1%84%D1%80%D0%B0%D0%BD%D1%86%D0%B8%D1%8F/2024-08-28_2024-08-30/no-return?adults=2&children=0&infants=0";
function readPage() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("reader is running...");
        const browser = yield playwright_1.chromium.launch({ headless: false });
        const page = yield browser.newPage();
        try {
            yield page.goto(url, { waitUntil: "domcontentloaded" });
            yield page.waitForSelector('span.length-6');
            const cheapestTicket = yield page.$$eval('span.length-6', $ => $[1].textContent);
            const price = Number(cheapestTicket === null || cheapestTicket === void 0 ? void 0 : cheapestTicket.slice(3, cheapestTicket.length));
            const message = price < 250 ?
                `price: ${price}\n[link to ticket](${url})` :
                null;
            return message;
        }
        catch (err) {
            console.error("Error during page processing:", err);
            return null;
        }
        finally {
            yield page.close();
            yield browser.close();
        }
    });
}
exports.default = readPage;
;
