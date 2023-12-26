<template>
    <div id="mse"></div>
</template>

<script setup>
import Player from "xgplayer";
import 'xgplayer/dist/index.min.css';
import HlsPlayer from "xgplayer-hls";
import Danmu from 'xgplayer/es/plugins/danmu'
import 'xgplayer/es/plugins/danmu/index.css'
import { ref, onMounted } from "vue";

const initPlayer = () => {
    const player = new Player({
        id: 'mse',
        url: '/src/assets/aaa.m3u8',
        plugins: [HlsPlayer, Danmu],
        autoplay: true,
        playsinline: true,
        fitVideoSize: 'fixWidth',
        videoFillMode: 'contain',
        width: '1200px',
        danmu: {
            area: { start: 0, end: 0.5}
        }
    })
};
onMounted(() => {
    initPlayer()
})


</script>

<style scoped>
.xgplayer :deep()video {
    width: 100%;
}
::v-deep .xgplayer-skin-default .xgplayer-progress-played{
    background-image: linear-gradient(90deg,#3983c5,#0e5591);
}
</style>
