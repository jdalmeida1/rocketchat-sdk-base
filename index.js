require('dotenv').config();
const puid = require('puid');
const { driver } = require('@rocket.chat/sdk');
// customize the following with your server and BOT account information
const HOST = process.env.ROCKET_HOST;
const USER = process.env.ROCKET_USER;
const PASS = process.env.ROCKET_PASS;
const BOTNAME = process.env.ROCKET_BOTNAME;  // name  bot response to
const SSL = process.env.SSL || true;  // server uses https ?
const ROOMS = ['GENERAL'];

var myuserid;
// this simple bot does not handle errors, different message types, server resets 
// and other production situations 

const runbot = async () => {
    const conn = await driver.connect( { host: HOST, useSsl: SSL})
    myuserid = await driver.login({username: USER, password: PASS});
    const roomsJoined = await driver.joinRooms(ROOMS);
    console.log('joined rooms');

    // set up subscriptions - rooms we are interested in listening to
    const subscribed = await driver.subscribeToMessages( processEvents );
    console.log('subscribed');

    // connect the processMessages callback
    const msgloop = await driver.reactToMessages( processMessages );
    console.log('connected and waiting for messages');

    // when a message is created in one of the ROOMS, we 
    // receive it in the processMesssages callback

    // greets from the first room in ROOMS 
    // const sent = await driver.sendToRoom( BOTNAME + ' is listening ...',ROOMS[0]);
    // console.log('Greeting message sent');
}

// callback for incoming messages filter and processing
const processMessages = async(err, message, messageOptions) => {
    const eventId = new puid(false).generate();
    console.log(`[${ eventId }] New message: `, message);
}

const processEvents = async (err, message, messageOptions) => {
    console.log('New event: ', message);
}

runbot()
