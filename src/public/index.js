$(document).ready(function() {
    let username = null;
    let chatChannel;
  
    while (!username) {
      getUsername();
    }
  
    getToken()
      .then(token => {
        console.log("returned token is ", token);
        return Twilio.Chat.Client.create(token, { logLevel: "debug" });
      })
      .then(client => {
        getChannelDescriptor(client)
          .then(channel => channel.getChannel())
          .then(channel => channel.join())
          .then(channel => {
            chatSetupCompleted();
            chatChannel = channel;
            channel.on("messageAdded", onMessageAdded);
            activateChatBox();
          });
      })
      .catch(
        error =>
          console.log("error setting up twilio", error) || chatSetupFailed()
      );
});