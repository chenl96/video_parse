<template>
  <div id="mse"></div>
  <div id="audio" v-show="false"></div>
</template>

<script setup>
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import HlsPlayer from "xgplayer-hls";
import Mp4Plugin from "xgplayer-mp4";
import { Events } from "xgplayer";
import Danmu from "xgplayer/es/plugins/danmu";
import "xgplayer/es/plugins/danmu/index.css";
import { ref, onMounted, reactive, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { Base64 } from "js-base64";
import { baseWebUrl, token, decodeM3u8, xmlParse } from "../config";

const route = useRoute();
const currentInstance = getCurrentInstance();
const { proxy } = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;

let videoTitle = ref(null);
let vid = ref(null);
let videoUrl = ref(null);

const videoInfo = () => {
  let viderQuery = reactive({
    query: route.query,
  });
  const episodeId = viderQuery.query.episodeId;
  console.log(episodeId);
  $http
    .get(`${baseWebUrl}video/vinfo/${episodeId}?cmd=app`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log(res.data);
      const resData = res.data.data;
      videoTitle.value = resData.title + " " + resData.subtitle;
      vid.value = resData.vid;
      getVideoM3u8(vid.value);
    });
};

const getVideoM3u8 = (vid) => {
  console.log(vid);
  $http
    .get(`${baseWebUrl}`, {
      params: {
        code: `${vid}h3`,
        lang: "",
        cmd: "sproxy",
      },
    })
    .then((res) => {
      console.log(res.data);
      const baseUrl = Base64.decode(res.data.base);
      const m3u8 = res.data.m3u8;
      const uid = res.data.uid;
      const videoM3u8 = decodeM3u8(m3u8, uid).replace(/d::/g, baseUrl);
      console.log(videoM3u8);
      if (videoM3u8.includes("BaseURL")) {
        videoUrl.value = xmlParse(videoM3u8);
        console.log(videoUrl.value);
        initMp4Player(videoUrl);
      } else {
        let blob = new Blob([videoM3u8], { type: "application/zip" });
        videoUrl.value = window.URL.createObjectURL(blob);
        console.log(videoUrl.value);
        initHlsPlayer(videoUrl);
      }
    });
};
initMp4Player()
const initHlsPlayer = (url) => {
  console.log(videoUrl.value);
  let player = new Player({
    id: "mse",
    url: url.value,
    plugins: [HlsPlayer, Danmu],
    autoplay: true,
    playsinline: true,
    fitVideoSize: "fixed",
    videoFillMode: "contain",
    width: "1200px",
    height: "675px",
    danmu: {
      area: { start: 0, end: 0.5 },
    },
  });
};
const initMp4Player = (videoAudioDict) => {
  console.log(videoAudioDict.value.video);
  let videoPlayer = new Player({
    id: "mse",
    url: videoAudioDict.value.video,
    plugins: [Danmu],
    playsinline: true,
    autoplay: true,
    fitVideoSize: "fixed",
    videoFillMode: "contain",
    width: "1200px",
    height: "675px",
    mp4plugin: {
      maxBufferLength: 50,
      minBufferLength: 10,
    },
  });
  let audioPlayer = new Player({
    id: "audio",
    url: videoAudioDict.value.audio,
    playsinline: true,
    autoplay: true,
  });
  videoPlayer.addListener("timeupdate", function () {
    // 当第一个视频的播放时间更新时，同步更新第二个视频的播放时间
    audioPlayer.currentTime = videoPlayer.currentTime;
  });
  videoPlayer.addListener('play', function() {
    // 当第一个视频开始播放时，同步开始第二个视频
    audioPlayer.play();
  });

  // 监听第一个视频的暂停事件
  videoPlayer.addListener('pause', function() {
    // 当第一个视频暂停时，同步暂停第二个视频
    audioPlayer.pause();
  });
};
onMounted(() => {
  videoInfo();
});
</script>

<style scoped>
.xgplayer :deep()video {
  width: 100%;
}
::v-deep .xgplayer-skin-default .xgplayer-progress-played {
  background-image: linear-gradient(90deg, #3983c5, #0e5591);
}
</style>
