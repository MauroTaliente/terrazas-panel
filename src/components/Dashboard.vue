<template>
  <div class="container">
    <Menu>
      <User></user>
    </Menu>
    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

import Menu from './Menu'
import Promo from './Promo'


export default {
  name: 'Dashboard',
  components: {
    Menu,
    Promo,
  }
}
</script>

<style lang="scss">

  @import '~globscss/components/flexbox';
  @import "~globscss/mi-grid.scss";
  @import "~globscss/main.scss";

  main{
    @include flex;
    flex-direction: column;
    width: calc(100% - 5rem);
    margin-left: 5rem;
    padding: 2em 1em;
    background-color: $color-fondo;
  }
 
</style>

