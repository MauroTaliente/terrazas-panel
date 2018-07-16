<template>
  <div class="list full">
    <h4 class="label"
        v-if="name">
       {{ name }}
    </h4>
    <ul>
      <li v-for="item in items" :key="item._id">
        <div class="name">
          {{ item.name }}
        </div>
        <div v-if="editMode" class="controles">
          <span class="btn btnEliminar"
            v-on:click="emitEvent('remove', item)">
            <i  class="material-icons">remove</i>
          </span>
        </div>
        <div v-if="controls" class="controles">
          <span class="btn"
            
            v-on:click="emitEvent('edit', item)" >
            <i class="material-icons">border_color</i>
          </span>
          <span class="btn btnEliminar" 
            v-on:click="emitEvent('delete', item._id)">
            <i class="material-icons">delete</i> 
          </span>
          <div class="estado">
            <i class="material-icons on"
              v-if="item.state">done</i>
            <i class="material-icons off"
                v-if="!item.state">not_interested</i>
          </div>
        </div>

      </li>
    </ul>
    <code>{{ $data.itemsData }}</code>
  </div>
</template>

<script>

export default {
  name: 'DisplayList',
  props:{
    name: '',
    items: '',
    scroll: '',
    editMode: {type: Boolean},
    controls: {type: Boolean},
  },
  data (){
    return{
      item:{
        _id: '',
        name: '',
      }
    }
  },
   methods:{
    emitEvent(action, el){
      this.$emit('emitEvent', action, el);
    }
  },
  created () {
    this.itemsData = this.items
  }
}
</script>

<style lang="scss">

@import '~globscss/mi-grid.scss';
@import "~globscss/main.scss";
@import '~globscss/components/core';
@import '~globscss/components/media-queries';
@import '~globscss/components/flexbox';

.list{
  padding: 0.5rem 0 0 0;
  width: 100%;
  ul{
    width: 100%;
    margin: 0;
    li{
      margin: 0;
      width: 100%;
      font-weight: 200;
      font-size: 0.9rem;
      letter-spacing: 0.05em;
      border: 1px solid $color-fondo;
      background-color: $color-6;
      border-radius: 0.2em;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      margin-bottom: 0.4rem;
      transition: 0.2s ease all;
    }
  }
  .controles{
    display: flex;
    justify-content: center;
    align-items: center;
    .btn{
      @include flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $color-2;
      border-radius: 0.2rem;
      padding: 0.4em 0.8em;
      margin-right: 0.4rem;
      i{
      font-size: 1rem;
      }
    }
    .btnEliminar{
      border: 1px solid $color-err; 
    }
     .estado{
        @include flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        color: $color-4;
        background-color:  rgba($color-3, 1);
        transition: 0.2s ease all;
        padding: 0.4rem;
        i{
          font-size: 1rem;
        }
      }
  }
}
  
</style>