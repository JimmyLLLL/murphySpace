<template>
  <div class="header-wrapper">
    <div class="left">我是左边</div>
    <div class="center">MurphySpace</div>
    <div class="right">我是右边</div>
  </div>
</template>

<script>
export default {
  name: 'murphyHeader'
}
</script>

<style lang="scss" scoped>
  .header-wrapper{
    height: 40px;
    background: black;
    display: flex;
  }
  .left,.center,.right{
    flex: 1;
    color: white;
    line-height: 40px;
    text-align: center;
  }
</style>
