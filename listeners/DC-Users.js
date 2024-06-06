module.exports = (client) => {

  const DCuserID = ['USER ID HERE']; // This user role will get disconnected if he opens camera or stream on any channel (it was made for fun, delete DC-Users.js if you don't wanna use!).

  client.on('voiceStateUpdate', async (oldState, newState) => {
    // Check if the user started streaming in a voice channel or using camera.
    if ((newState.streaming || newState.selfVideo) && DCuserID.includes(newState.member.user.id)) {
      // Disconnect the user from the voice channel.
      newState.member.voice.disconnect()
        .then(msg => console.log(`A user tried to screenshare their screen or camera and got disconnected.`))
        .catch(console.error);
    }
  });
};