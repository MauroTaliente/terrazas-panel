<template>
    <div :class="['menu', displaySmallMenu]">
      <div class="header">
        <button class="toggleMenu" @click="menuAnimation()">
          <i class="material-icons" v-if="!menuBig">menu</i>
          <i class="material-icons" v-if="menuBig">close</i>
        </button>
        <User></User>
      </div>
      <div class="list">
        <!-- <router-link :to="sections">
          <i class="material-icons">more</i>
          <transition name="fade">
           <span v-if="menuBig">Secciones</span>
          </transition>
        </router-link> -->

        <router-link :to="promos">
          <i class="material-icons">credit_card</i>
          <transition name="fade">
           <span v-if="menuBig">Promos</span>
          </transition>
        </router-link>

        <router-link :to="eventts">
          <i class="material-icons">event</i>
          <transition name="fade">
           <span v-if="menuBig">Eventos</span>
          </transition>
        </router-link>

        <router-link :to="stores">
          <i class="material-icons">store_mall_directory</i>
          <transition name="fade">
           <span v-if="menuBig">Locales</span>
          </transition>
        </router-link>

        <router-link :to="volver">
          <i class="material-icons">arrow_back</i>
          <transition name="fade">
           <span v-if="menuBig">Volver</span>
          </transition>
        </router-link>
      </div>
    </div>

</template>

<script>

import User from './User'
import VueRouter from 'vue-router';

export default {
  name: 'Dashboard',
  components: {
    User,
  },
  data: function() {
    return {
      menuSmal: true,
      menuBig: false,
      sections: `/${this.$route.params.id}/dashboard/secciones`,
      promos: `/${this.$route.params.id}/dashboard/promos`,
      eventts: `/${this.$route.params.id}/dashboard/eventos`,
      stores: `/${this.$route.params.id}/dashboard/locales`,
      volver: `/${this.$route.params.id}/dashboard/`
    }
  },
  computed:{
    displaySmallMenu (){
        return (this.menuSmal)? 'smallMenu' : ''
    }
  },
  methods:{
    menuAnimation (){
      if (!this.menuBig) {
        this.menuSmal = !this.menuSmal
        setTimeout(() => {
          this.menuBig = !this.menuBig
        }, 300);
      }else{
        this.menuBig = !this.menuBig
        setTimeout(() => {
          this.menuSmal = !this.menuSmal
        }, 300);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

$cssCore: false;
$cssHelpers: false;
$devMode: false;
$gutter: 0;

$breakpoints : (
  s  : 0,
  m  : 640px,
  l  : 1024px,
  xl : 1440px
) !default;

  @import '~globscss/components/flexbox';
  @import "~globscss/mi-grid.scss";
  @import "~globscss/main.scss";

  .menu{
    position: fixed;
    z-index: 10;
    @include flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 12rem;
    height: 92vh;
    margin-top: 4vh;
    border-radius: 0 0.4rem 0.4rem 0;
    border-right: 1px solid $color-2;
    border-top: 1px solid $color-2;
    border-bottom: 1px solid $color-2;
    background-color:$color-3;
    box-shadow: 4px 0px 30px -10px $sombra;
    transition: 0.25s ease all;
    .list{
      @include flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      a{
        @include flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-bottom: 1px solid $color-fondo;
        text-decoration: none;
        color: $color-5;
        &:hover{
          color: $color-1;
          background-color: $color-6;
        }
      }
      i{
        font-size: 1.5rem;
      }
      span{
        font-weight: 200;
        font-size: 1rem;
        padding-left: 1rem;
      }
    }
    .header{
      @include flex;
      width: 100%;
      align-items: center;
      align-self: flex-start;
    }
    .toggleMenu{
      width: 100%;
      @include flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      padding: 1rem 1.5rem;
      margin: 0;
      background-color: transparent;
      border: none;
      color: $color-5;
      &:hover{
        color: $color-1;
        background-color: $color-6;
      }
      i{
        font-size: 3em;
      }
    }
    .userArea{
      @include flex;
      position: relative;
      width: calc(100%);
      border-top: 2px solid $color-fondo;
      border-bottom: 1px solid $color-fondo;
      .user{
        width: 100%;
      }
    }
  }
  .smallMenu{
    transition: 0.25s ease all;
    width: 5rem;
    height: 100vh;
    border: 1px solid transparent;
    border-radius: 0;
    margin: 0;
  }


</style>

