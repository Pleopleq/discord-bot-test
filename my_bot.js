const Discord = require('discord.js')
require('dotenv').config()
const client = new Discord.Client()

let discordKey = process.env.DISCORD_KEY

function helpCommand(arguments, receivedCommand){
    if(arguments.length  == 0){
        receivedCommand.channel.send('Im not sure what you need help with. Try `!help [topic]`')
        receivedCommand.react("👎")
    } else {
        receivedCommand.channel.send('It looks like you need help with ' + arguments)
    }
}

function multiplyCommand(arguments, receivedMessage){
    if(arguments < 2){
        receivedMessage.channel.send('Not enough arguments. Try `!multiply 2 10`')
        return
    }
    receivedMessage.react("✳")
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send('The product of ' + arguments + ' is ' + product.toString())
}

function processCommand(receivedCommand){
    let fullCommand = receivedCommand.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if(primaryCommand == "help"){
        helpCommand(arguments, receivedCommand)
    } else if( primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedCommand)
    } else {
        receivedCommand.channel.send("Unknown Command. try `!help` or `!multiply`")
    }
}

client.on('ready', () => {
    let generalChannel = client.channels.cache.get('750164965201149976')
    const attachment = new Discord.MessageAttachment("https://www.lifeder.com/wp-content/uploads/2017/03/tlacuache.jpg")

    console.log('Connected as "' + client.user.tag)

    client.user.setActivity("with Javascript")

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
         guild.channels.cache.forEach((channel) => {
            console.log(`- ${channel.name} ${channel.type} ${channel.id}`)
        })
    })
    generalChannel.send(attachment)
})

client.on('message', (receivedMessage) => {
    if(receivedMessage.author == client.user){
        return
    } 
    /* receivedMessage.channel.send(`Message received, ${receivedMessage.author.toString()}: ${receivedMessage.content}`)*/
    
    if(receivedMessage.content.startsWith('!')){
        processCommand(receivedMessage)
    }

})


client.login(discordKey)