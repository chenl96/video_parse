<template>
  <div class="main">
    <div class="detail">
      <el-image :src="mvDetail.album.pic"></el-image>
      <div class="info">
        <el-descriptions :title="mvDetail.album.title" :column="2" size="large">
          <el-descriptions-item label="演员" width="400px">{{
            mvDetail.album.actor.join(" ")
          }}</el-descriptions-item>
          <el-descriptions-item label="剧情类别">{{
            mvDetail.album.type.join(" ")
          }}</el-descriptions-item>
          <el-descriptions-item label="导演">{{
            mvDetail.album.director.join(" ")
          }}</el-descriptions-item>
          <el-descriptions-item label="地区">
            {{ mvDetail.album.area.join(" ") }}
          </el-descriptions-item>
          <el-descriptions-item label="年份"
            >{{ mvDetail.album.year }}
          </el-descriptions-item>
          <el-descriptions-item label="更新状态"
            >{{ mvDetail.album.updated }}
          </el-descriptions-item>
          <el-descriptions-item label="上次更新"
            >{{ mvDetail.album.time }}
          </el-descriptions-item>
          <el-descriptions-item label="类型"
            >{{ mvDetail.album.sort }}
          </el-descriptions-item>
          <el-descriptions-item label="简介" width="800px" span="2"
            >{{ mvDetail.album.summary }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <div class="play-list">
      <div v-for="(item, index) in mvDetail.vlist" class="play-div">
        <el-button class="play-button" type="info" plain>{{
          item.episode
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    mvInfo: Object,
});
const mvDetail = props.mvInfo
console.log(mvDetail)


</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.detail {
  display: flex;
  width: 100%;
  height: 100%;
}
.el-image {
  width: 200px;
  height: 300px;
  margin: 0px 20px 20px 0px;
}
.play-list {
  display: flex;
  flex-wrap: wrap; /* 允许元素在需要时换行 */
  justify-content: left; /* 水平方向均匀分布 */
  height: 100%;
  overflow-y: auto;
  align-content: flex-start;
}
.play-button {
  margin: 10px;
  width: 60px;
}
.play-div {
    line-height: 30px;
}
</style>
