<template>
  <div>
    <h2>HOLA</h2>
  </div>
</template>

<script>
import axios from 'axios'
const urlUser = 'http://localhost:3000/api/user';

export default {
  name: 'Dashboard'
}
</script>

<style lang="scss">
  body{
    color: wheat;
    background-color: black;
    position: relative;
  }
</style>
