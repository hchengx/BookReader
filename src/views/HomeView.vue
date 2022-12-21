<script setup lang="ts">
import EBook from '@/ebook'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
let ebook: EBook
const store = useStore()
onMounted(() => {
  ebook = new EBook('reader-view')
  store.commit('SET_EBOOK', ebook)
})
</script>

<template>
  <div class="home">
    <el-container id="reader-container">
      <el-aside>
        <div id="activitybar">
          <div class="siderbar-icon" @click="ebook.openFile()">open</div>
          <div @click="ebook.bookmark()">mark</div>
          <div @click="ebook.gotomark()">goto mark</div>
          <div @click="ebook.prevchapter()">prevchapter</div>
          <div @click="ebook.nextchapter()">nextchapter</div>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div id="reader-view"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
// .el-container {
//   width: 100%;
//   height: 100%;
//   padding: 0;
//   margin: 0;
// }

.home {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.el-aside {
  #activitybar {
    width: 50%;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background-color: darkgoldenrod;

    div {
      background-color: darkcyan;
      margin: 30px;
      width: 100%;
      text-align: center;
    }
  }
}

#reader-container {
  width: 100%;
  height: 100%;
  margin: 0;
  // background-color: aquamarine;
}

#reader-view {
  width: 50%;
  min-width: 1000px;
  height: 100%;
  margin: 0 auto;
  background-color: blanchedalmond;
}
</style>
