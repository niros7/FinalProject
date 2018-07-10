/*let userModel = require('../models/userModel.js');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("635765527611-gb7sn0to64k182rnkuaj7g3b3otgnkv8.apps.googleusercontent.com");

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience:"635765527611-gb7sn0to64k182rnkuaj7g3b3otgnkv8.apps.googleusercontent.com"  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    console.log('userId='+userid);
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
  }


  function addUser(data,callback){
      console.log(data.authToken);
    verify(data.authToken).then(function(decodedToken) {
      userModel.findOneAndUpdate({id:data.id}, 
        data, {upsert:true}, function(err, doc){
        if (err) return callback(500, { error: err });
        return callback({ data: data });
      });
      // ...
    }).catch(function(error) {
      console.log(error);
      return callback(error);
    });
  }

  function addFacebookUser(data,callback){
    
}
  //verify().catch(console.error);

  module.exports = { addUser,verify }*/