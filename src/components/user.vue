<template>
  <div class="userArea">
    <div class="user">
      <div class="perfil">
        <div class="imagePerfil">
          <img :src="el.avatar" alt="">
        </div>
        <transition name="fade">
        <div class="datos" v-if="this.$parent.menuBig">
          <h4>
            {{ el.displayName }}
          </h4>
          <p>
            {{ el.type }}
          </p>
          <button class="btnSalir" 
              v-if="this.$parent.menuBig"
              v-on:click="signOutUser()">
           salir
          </button>
        </div>
        </transition>
      </div> 
    </div>
  </div>
</template>

<script>

import helpers from '../helpers'
import axios from 'axios'

// const urlUser = `http://localhost:3000/api/user/`;
const urlUser = `${helpers.api}user/`;
const config = {
  headers: {
    authorization: 'Bearer ' + localStorage.token
  }
}

export default {
  name: 'User',
  created: function() {
    this.getUsers();
  },
   data() {
    return {
      el: {/* EL USUARIO QUE SE LOGUEO */},
      state: !this.$parent.showFullMenu,
      userId: this.$route.params.id,
    };
  },
  computed:{
  },
  methods: {
    getUsers: function() {
      
      axios.get( urlUser+this.userId ,config)   
      .then(response => {
        this.el = response.data.user
      })
      .catch(error => {
        console.log(error);
      })
    },
    signOutUser: function() {
      this.$router.push(`/`)
      localStorage.clear();
    },
  }
}
</script>

<style lang="scss">

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

  @import '~globscss/mi-grid.scss';
  @import "~globscss/main.scss";
  @import '~globscss/components/core';
  @import '~globscss/components/media-queries';
  @import '~globscss/components/flexbox';
 
  .btnSalir{
    padding: 0.2em 0 0 0;
    font-size: 1rem;
    border-radius: 0.4em;
    border: none;
    font-weight: 400;
    text-align: left;
    box-sizing: border-box;
    color: $color-err;
    background-color: transparent;
    transition: 0.2s ease all; 
  }

  .user{
    @include flex;
    @include edItem(50,100,100,100);
    background-color: $color-3;
    justify-content: space-between;
    align-items: center;
    color: $color-1;
    .perfil{
       @include flex;
      .datos{
        @include flex;
        flex-direction: column;
        justify-content: center;
        transition: 0.3s ease all;
      }
      .imagePerfil{
        max-width: 80px;
        border-radius: 100%;
        overflow: hidden;
        margin: 1em;
        transition: 0.2s ease all;
      }
    }
    .btn{
      display: flex;
      margin-right: 1em;
      transition: 0.3s ease all;
    }
  }

</style>
