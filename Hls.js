const hls = new Hls({

lowLatencyMode:true,
maxBufferLength:5,
liveSyncDuration:2,
liveMaxLatencyDuration:5,
enableWorker:true

})