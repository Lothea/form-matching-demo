<template>
  <header>
    <img src="assets/logo.png" alt="" />
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(["title"])
}
</script>

<style scoped>
  /* header{
    display: flex;
    flex-direction: row;
  
    align-items: flex-end;
  } */

  h1{
    text-align: center;
  }

  img{
    position:absolute;
    width: 214px;
    height: 68px;
  }

</style>