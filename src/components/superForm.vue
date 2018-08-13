<template>
    <form class="vue-form" @submit.prevent="send">
    <section class="header">
     <span class="windowComander"
           v-on:click="emitToggle()">
      <i class="material-icons" v-if="!swich">add_box</i>
      <i class="material-icons" v-if="swich">indeterminate_check_box</i>
    </span>
    <legend>{{ name }}</legend>

    <div class="left">
      <span class="windowComander"
            v-if="type == 'add' || type == 'addCat'"
            v-on:click="emitReset()">
        <i class="material-icons">
          loop
        </i>
      </span>
      <span class="windowComander"
            v-on:click="emitClose()"
            v-if="type == 'edit' || type == 'editCat' ">
        <i class="material-icons">
          close
        </i>
      </span>
    </div>
    </section>
    <slot>
    <!-- CONTENIDO DEL FORM -->
    </slot>
    <div class="launchArea" v-if="swich && !noneLaunch">
      <button class="btnImportant"
              type="submit">
        <i class="material-icons">launch</i> <span>{{ type }}</span>
      </button>
    </div>
    <!-- <code>{{$props}}</code> -->
  </form>

</template>

<script>

export default {
  name: 'superForm',
  props:{
    name: '',
    type: '',
    swich: '',
    noneLaunch: {type: Boolean},
    scroll: '',
  },
  data() {
    return{
    }
  },
  computed:{
  },
  methods:{
    emitToggle (){
      this.$emit('emitToggle');
    },
    emitReset (){
      this.$emit('emitReset');
    },
    emitClose (){
      this.$emit('emitClose');
    },
    send (){
      this.$emit('send', this.type);
    }
  }
}

</script>

<style lang="scss">

  @import '~globscss/mi-grid.scss';
  @import "~globscss/main.scss";
  @import '~globscss/components/core';
  @import '~globscss/components/media-queries';
  @import '~globscss/components/flexbox';

.vue-form{
  @include flex;
  @include edContainer;
  @include blueCard;
  .header{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    legend{
      padding: 1.5em 0;
      color: $color-5;
      font-size: 1em;
      font-weight: 200;
      letter-spacing: 0.1em;
      padding-bottom: 1em;
    }
    .left{
      position: absolute;
      right: 0;
      display: flex;
      flex-wrap: wrap;
      align-self: flex-end;
    }
    .windowComander{
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      font-size: 1em;
      padding: 1.2em 1em 0.8em 1em;
      &:hover{
        color: $color-4;
        i{
          text-shadow: 0 2px 10px $color-3;
        }
      }
    }
  }
  .label{
    margin-bottom: 0.5rem;
    font-size: 0.8em;
    font-weight: 200;
  } //Son los lebels de todos los forms
  .content{
    @include edContainer;
    @include flex;
    position: relative;
    padding: 0.5em 0;
    border-top: 2px solid $color-fondo;
  }
  .launchArea{
    cursor: pointer;
    padding: 0;
    width: 100%;
    border-top: 2px solid $color-fondo;
  }
  .btnImportant{
    @include btnImportant;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;
    padding: 0.25em;
    span{
      position: absolute;
      display: flex;
      right: 2em;
      font-size: 1em;
      color: $color-fondo;
    }
  }
}

</style>
