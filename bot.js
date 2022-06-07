const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS
    ]
});

quoteBook = []
commandChar = '!'

function find(num) {
    return quoteBook[num];
}

function arrayRemove(arr, value) {   
    arr.splice(value, 1);
    return arr;
}

client.once('ready', () => {
    client.user.setUsername("Quote Bot");
    console.log('logged in as Quote Bot.');
});

client.on('messageCreate', (msg) => {
    if(!msg.content.startsWith(commandChar)) return;
    const args = msg.content.slice(1).split(' ');
    cmdBody = msg.content.slice(msg.content.indexOf(' ')).toLowerCase();
    const cmd = args.shift().toLowerCase();
    switch(cmd) {
        case 'new':
            quoteBook.push(cmdBody);
            msg.channel.send('Quote added! The Quote Number is ' + quoteBook.length);
            break;
        case 'find':
            cmdBody = parseInt(cmdBody);
            cmdBody--; 
            text = quoteBook[cmdBody];
            if(text === undefined)
                msg.channel.send('There is no quote corresponding to the index ' + (cmdBody + 1) + '.');           
            else   
                msg.channel.send(text);
            break;
        case 'delete':
            cmdBody = parseInt(cmdBody)
            cmdBody--;
            quoteBook = arrayRemove(quoteBook, cmdBody)
            msg.channel.send("The quote with the index of " + (cmdBody + 1) + " has been removed. Every quote after it has moved down a space.");
            break;
        case 'list':
            if(quoteBook.length === 0) 
                msg.channel.send("there are no quotes currently in the Quote Book");
            else {
                allQuotes = "\n"; 
                for(quote in quoteBook) {
                    text2 = quoteBook[quote];
                    allQuotes = allQuotes.concat(text2,"\n");
                }
                msg.channel.send(allQuotes);
            }
            
    }
});
client.login('OTc3MDEyMjA0NTY4MTk1MTA0.GtPKyO.39yfuZ8CfnrIoAJqC4P-AOAhxK1HdYTcvhjNJo');