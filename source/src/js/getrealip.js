//get the IP addresses associated with an account
window.getIPs = function (callback){
  var ip_dups = {};

  //compatibility for firefox and chrome
  var RTCPeerConnection = window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection;
  var mediaConstraints = {
    optional: [{RtpDataChannels: true}]
  };

  //firefox already has a default stun server in about:config
  //  media.peerconnection.default_iceservers =
  //  [{"url": "stun:stun.services.mozilla.com"}]
  var servers = undefined;

  //add same stun server for chrome
  if(window.webkitRTCPeerConnection)
    servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

  //construct a new RTCPeerConnection
  var pc = new RTCPeerConnection(servers, mediaConstraints);

  //listen for candidate events
  pc.onicecandidate = function(ice){

    //skip non-candidate events
    if(ice.candidate){

      //match just the IP address
      var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
      var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];

      //remove duplicates
      if(ip_dups[ip_addr] === undefined)
        callback(ip_addr);

      ip_dups[ip_addr] = true;
    }
  };

  //create a bogus data channel
  pc.createDataChannel("");

  //create an offer sdp
  pc.createOffer(function(result){

    //trigger the stun server request
    pc.setLocalDescription(result, function(){}, function(){});

  }, function(){});
};

window.getLocalIP = function (callback) {
  var localIPReg = /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/;

  var localIPlist = [];

  var ipRank = [192,10,172,254];

  window.getIPs(function(ip) {
    localIPlist.push({
      ip: ip,
      group: ip.split('.')[0]
    });
  });

  // wait 50ms for all ip has got
  setTimeout(function () {
    // all lcoal ip should display , and then get the real local ip
    localIPlist.sort(function (a, b) {
      var rankA = ipRank.indexOf(Number(a.group));
      var rankB = ipRank.indexOf(Number(b.group));

      if(rankA === -1) {
        return true;
      }

      if(rankB === -1 ||  rankB > rankA) {
        return false;
      } else {
        return true;
      }
    });

    if (localIPlist.length) {
      callback(localIPlist[0]['ip']);
    } else {
      callback('0.0.0.0');
    }
  }, 50);

};
