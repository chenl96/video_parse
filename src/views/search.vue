<template>
  <div class="card">
    <el-input
      v-model="searchKeyword"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #append>
        <el-button icon="Search" @click="clickSearchButton" />
      </template>
    </el-input>
    <div class="show-result" v-loading="loading" v-if="isSearch">
      <div
        v-for="(item, index) in searchResult"
        :key="index"
        class="flex-item"
        @mouseover="handleMouseOver(index)"
        @mouseout="handleMouseOut(index)"
      >
        <div
          :class="{ hovered: isHovered(index) }"
          @click="navigateToDetail(item.mkey)"
        >
          <el-image
            :src="item.pic"
            referrer="no-referrer"
            referrerPolicy="no-referrer"
          ></el-image>
          <el-tooltip :content="item.title">
            <span class="mv-title">{{ item.title }}</span>
          </el-tooltip>
          <div class="source-logo">
            <img :src="logoDict[item.source]" alt="" class="log-img" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="show-info" v-loading="infoLoad">
      <mvInfo :mvInfo="mvDetail" />
    </div>
  </div>
</template>

<script setup>
import mvInfo from "../components/detail.vue";
import { ref, getCurrentInstance } from "vue";
import qs from "qs";
import {baseWebUrl, token} from "../config";

const currentInstance = getCurrentInstance();
const { proxy } = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;

const searchKeyword = ref("");
const searchResult = ref([]);
let isSearch = ref(true);
let activeItem = ref(null);
let loading = ref(false);
let infoLoad = ref(false);
const mvDetail = ref(null);
const logoDict = {
  iqiyi: "https://www.iqiyi.com/favicon.ico",
  youku: "https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png",
  txsp: "https://v.qq.com/favicon.ico",
  bilibili: "https://www.bilibili.com/favicon.ico",
  mgtv: "https://www.mgtv.com/favicon.ico",
  sohu: "https://tv.sohu.com/favicon.ico",
};
searchResult.value = [
  {
    title: "完美世界",
    alias: "wanmeishijie|wmsj|完美世界动画版",
    pic: "//puui.qpic.cn/vcover_vt_pic/0/mcv8hkc8zk8lnov1699409656220/0",
    source: "txsp",
    mkey: "655f39bf5qf591e4",
    cid: 3,
    status: "更新至138集",
  },
  {
    title: "《完美世界》宿命抉择",
    alias: "wanmeishijiesumingjueze|wmsjsmjz",
    pic: "//puui.qpic.cn/vcover_vt_pic/0/nxqqo1ovi0hfcuj1681458810/0",
    source: "txsp",
    mkey: "65542ve75af3e73d",
    cid: 3,
    status: "全31集",
  },
  {
    title: "完美世界：少年至尊篇",
    alias: "wanmeishijieshaonianzhizunpian|wmsjsnzzp",
    pic: "//m.ykimg.com/0527000063074CB613F7FF0996681B40",
    source: "youku",
    mkey: "6557j5a1e692bsb1",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界 少年至尊篇·动态漫",
    alias: "wanmeishijieshaonianzhizunpiandongtaiman|wmsjsnzzpdtm",
    pic: "//puui.qpic.cn/vcover_vt_pic/0/mzc002001xxfkm21673604176417/0",
    source: "txsp",
    mkey: "65d535ee7a3732f8",
    cid: 3,
    status: "全52集",
  },
  {
    title: "《完美世界》至尊宝器复刻",
    alias: "wanmeishijiezhizunbaoqifuke|wmsjzzbqfk",
    pic: "//puui.qpic.cn/vcover_vt_pic/0/dtqqq5ex1p8hoxj1687137908/0",
    source: "txsp",
    mkey: "65d5427r557a9z85",
    cid: 3,
    status: "全08集",
  },
  {
    title: "完美世界集锦",
    alias: "wanmeishijiejijin|wmsjjj",
    pic: "//m.ykimg.com/0584000061B991071FD85209476359B4",
    source: "youku",
    mkey: "65r50769eb6ea554",
    cid: 3,
    status: "全10集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
  {
    title: "完美世界：少年至尊篇 动态漫画",
    alias: "wanmeishijieshaonianzhizunpiandongtaimanhua|wmsjsnzzpdtmh",
    pic: "//pic4.iqiyipic.com/image/20231110/45/d6/a_100418006_m_601_m17_579_772.jpg",
    source: "iqiyi",
    mkey: "i655887bbd12b5fb",
    cid: 3,
    status: "全52集",
  },
];
searchResult.value.forEach((img) => {
  if (img.pic.startsWith("//")) {
    img.pic = "https:" + img.pic;
  }
});

const handleMouseOut = () => {
  activeItem.value = null;
};
const handleMouseOver = (index) => {
  activeItem.value = index;
};
const isHovered = (index) => {
  return activeItem.value == index;
};
const navigateToDetail = (clickMkey) => {
  infoLoad.value = true;
  loading.value = true;
  getDetail(clickMkey);
  setTimeout(() => {
    infoLoad.value = false;
    isSearch.value = false;
    loading.value = false;
  }, 2000);
};
function clickSearchButton() {
  if (searchKeyword.value.trim().length < 1) {
    proxy.$message.warning("搜索关键词不能为空");
    return;
  }
  searchResult.value = [];
  isSearch.value = true;
  const data = { kw: searchKeyword.value };
  loading.value = true;
  $http
    .post(
      `${baseWebUrl}video/search?cmd=app`,
      qs.stringify(data),
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      searchResult.value = res.data.data.albums;
      if (searchResult.value.length == 0) {
        proxy.$message.warning("未搜索到相关内容");
      }
      const albums = res.data.data.albums;
      albums.forEach((img) => {
        if (img.pic.startsWith("//")) {
          img.pic = "https:" + img.pic;
        }
      });
      setTimeout(() => {
        loading.value = false;
      }, 500);
    })
    .catch((err) => console.log(err));
}
const getDetail = (clickMkey) => {
  mvDetail.value = {};
  $http
    .post(
      `${baseWebUrl}video/detail?cmd=app`,
      qs.stringify({ mkey: clickMkey }),
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      mvDetail.value = res.data.data.detail;
    })
    .catch((err) => {});
};
</script>

<style scoped>
.card {
  position: fixed;
  width: 100%;
  top: 40px;
  height: 100%;
  padding: 0px;
}
.el-input {
  width: 50%;
  margin-bottom: 10px;
}
.el-input :deep().el-input__inner {
  --el-input-inner-height: 45px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  margin: 2px -6px;
}
/* .el-input :deep().el-input__icon {
  line-height: 30px;
} */
/* .el-input:deep().el-input-group__append {
  width: 4%;
} */
.el-button {
  width: 60px;
}
.show-result {
  display: flex;
  flex-wrap: wrap; /* 允许元素在需要时换行 */
  justify-content: left; /* 水平方向均匀分布 */
  align-content: flex-start;
  padding: 20px 10%;
  margin-bottom: 20px;
  height: 80%;
  overflow-y: auto;
}
.show-info {
  padding: 20px 10%;
  margin-bottom: 20px;
  height: 80%;
}
.flex-item {
  width: 150px; /* 设置元素宽度 */
  height: 220px; /* 设置元素高度 */
  margin: 20px 20px 20px 20px; /* 设置元素之间的外边距 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}
.el-image {
  width: 150px;
  height: 200px;
}
.hovered {
  transform: scale(1.1); /* 变大 */
  transition: transform 0.3s ease; /* 过渡效果 */
}
.mv-title {
  width: 150px;
  display: block;
  white-space: nowrap; /* 让文本不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
}
.source-logo {
  width: 23px;
  height: 23px;
  position: relative;
  top: -227px;
  left: 3px;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
}
.log-img {
  width: 80%;
  height: auto;
  position: absolute; /* 设置绝对定位 */
  top: 50%; /* 顶部距离为容器的一半 */
  left: 50%; /* 左侧距离为容器的一半 */
  transform: translate(-50%, -50%); /* 通过transform实现水平垂直居中 */
}
</style>
