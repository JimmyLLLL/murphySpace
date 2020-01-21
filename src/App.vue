<template>
  <div id="app">
    <Murphyheader/>
    <router-view/>
    <Murphynav />
  </div>
</template>

<script>
import Murphyheader from './components/header/header'
import Murphynav from './components/nav/nav'
export default {
  name: 'App',
  components:{
    Murphyheader,
    Murphynav
  }
}
</script>

<style>
</style>
