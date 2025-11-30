const { Telegraf } = require('telegraf')
const QRCode = require("qrcode")

const bot = new Telegraf("")

// /start => Welcome to QRCode generator
bot.start((ctx) => {
    ctx.reply('Welcome to QRCode generator')
})
// /help =>  to use this bot please follow this command:
//        /qr text
bot.help((ctx) => {
    ctx.reply('to use this bot please follow this command:\n'+
        '/qr text'
    )
})
//command to generate the qrcode 
bot.command("qr", async (ctx)=>{
    console.log(ctx.message)
    const text = ctx.message.text.split(" ").slice(1).join(" ")
    if(!text) return ctx.reply("usage: /qr <text>")
    
    const fliePath = "qr.png"
    try{
        await QRCode.toFile(fliePath,text)
        await ctx.replyWithPhoto({source:fliePath},{caption: "your QR code"})
    }catch(err){
        ctx.reply("error generating qr code")
    }
})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))