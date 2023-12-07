import Pusher from 'pusher-js';

class PusherService {
    constructor({appId, appCluster, appChannel, listenTo}) {
        this.pusher = new Pusher(appId, { cluster: appCluster });
        this.channel = this.pusher.subscribe(appChannel);
        this.listenTo = listenTo;
      }
    
      bindPostCreated(callback) {
        this.channel.bind(this.listenTo, callback);
      }
}

export default PusherService;