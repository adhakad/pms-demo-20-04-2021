const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const videoss = document.getElementById('videos')

const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '443'
})
let myVideoStream;

const peers = {}

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  const myVideo = document.createElement('video')
  myVideo.muted = true; 
  addVideoStream(myVideo, stream) 
  myPeer.on('call', call => { 
    call.answer(stream)
    const videos = document.createElement('video')
    videos.muted = true;
    videos.controls = true;
    call.on('stream', userVideoStream => {
      addVideoStreams(videos, userVideoStream) 
    })
  })
  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  }) 
  
})



  




socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})


function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const videos = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStreams(videos, userVideoStream)
  })
  call.on('close', () => {
    videos.remove()
  })
  peers[userId] = call
}




function addVideoStream(myVideo, stream) {
  myVideo.srcObject = stream
  myVideo.addEventListener('loadedmetadata', () => {
    myVideo.play()
  })
  videoGrid.append(myVideo)
}
 
function addVideoStreams(videos, stream) {
  videos.srcObject = stream
  videos.addEventListener('loadedmetadata', () => {
    videos.play()
  })
  videoss.append(videos)
}