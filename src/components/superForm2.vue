<template>
    <form class="vue-form" @submit.prevent="emitEvent('send', type)">
    <section class="header">
     <span class="windowComander"
        v-if="!winNone"
        v-on:click="emitEvent('toggle')">
      <i class="material-icons" v-if="!swich">add_box</i>
      <i class="material-icons" v-if="swich">indeterminate_check_box</i>
    </span>
    <span class="noneWindowComander"
      v-if="winNone">
    </span>
    <legend>{{ name }}</legend>
    <div class="left">
      <span class="windowComander"
            v-if="editMode"
            v-on:click="emitEvent('editMode')">
        <i class="material-icons">
          border_color
        </i>
      </span>
      <span class="windowComander"
            v-if="type == 'add' || type == 'addCat'"
            v-on:click="emitEvent('reset')">
        <i class="material-icons">
          loop
        </i>
      </span>
      <span class="windowComander"
            v-on:click="emitEvent('close')"
            v-if="type == 'edit' || type == 'editCat' ">
        <i class="material-icons"
           v-if="swich">
          close
        </i>
        <i class="material-icons"
           v-if="!swich">
          border_color
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
  name: 'superForm2',
  props:{
    name: '',
    type: '',
    swich: '',
    noneLaunch: {type: Boolean},
    scroll: '',
    winNone:  {type: Boolean},
    editMode:  {type: Boolean},
  },
  data() {
    return{
    }
  },
  computed:{
  },
  methods:{
    emitEvent (action, el){ 
      this.$emit('emitEvent', action, el); 
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
  .noneWindowComander{
    width: 0.5rem;
    padding: 1rem 0;
  }
}

</style>
