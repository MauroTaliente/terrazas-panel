<template>
    <div :class="['menu', displaySmallMenu]">
      <div class="header">

      </div>
      <div class="list">

        <slot></slot>

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
    z-index: 5;
    @include flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    margin-top: -2rem;
    margin-left: -6rem;
    background-color:$color-6;
    transition: 0.25s ease all;
    .list{
      @include flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      span{
        @include flex;
        align-items: center;
        justify-content: center;
        padding: 1.3rem 1rem;
        text-decoration: none;
        color: $color-5;
        cursor: pointer;
        &:hover{
          color: $color-1;
          background-color: $color-3;
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

 
</style>

