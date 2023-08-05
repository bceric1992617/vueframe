<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script setup>
import { reactive, toRefs, onMounted, ref, getCurrentInstance } from 'vue';
import { userIp } from '@/api/index.js';
import { mapState, useStore } from "vuex";

const { proxy } = getCurrentInstance();
const store = useStore();



onMounted( () => {
  userIp().then(res => {
    proxy.$common.getUserId(res.data.ip);
  })
})

</script>
