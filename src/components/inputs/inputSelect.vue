<template>
  <div class="item eventts">
    <h4 class="label">{{ name }}</h4>
    <v-select :class="multipleClass"
              v-model="value"
              :value="value"
              :options="options"
              :label="label"
              :multiple="multiple"
              @input="updateInput">
    </v-select>
    <!-- <code>{{$props}}</code> -->
  </div>
</template>

<script>

import { Bus } from '../../helpers/Bus.js'
import vSelect from 'vue-select';

export default {
  name: 'inputSelect',
  components:{
    vSelect
  },
  props:{
    name: '',
    oNmodel: '',
    options: '',
    label: '',
    multiple: {
      type: Boolean,
      }
  },
  data (){
    return{
      value: '',
      optionsD: ['cargando...']
    }
  },
  computed:{
    multipleClass (){
      return (this.multiple)? 'v-select-multiple' : ''
    }
  },
  methods:{
    updateInput () {
        this.$emit('input', this.value);     
    },
    reset (){
        this.value = '';      
    },
    update (){
        this.value = this.oNmodel
    }
  },
  created (){
    Bus.$on('reset', this.reset);
    Bus.$on('update', this.update)
  }
}
</script>

<style lang="scss">

  @import "~globscss/main.scss";

  .v-select{
    width: 100%;
    position: relative;
    background-color:$color-1;
    border-radius: 4px;
    box-shadow: 0 1px 3px $sombra;
    height: 2rem;

    .selected-tag{
      position: relative;
      text-align: center;
      padding-left: 0.5em;
      font-size: 0.8em;
      font-weight: 200;
    }
    .dropdown-toggle{
      border: none;
    }
    .open-indicator{
      height: 18px;
      &::before{
        border-color: $color-2;
      }
    }
    .clear{
      display: none;
    }
    .dropdown-menu{
      min-width: auto;
      width: 100%;
      position: absolute;
      li{
        width: 100%;
        margin: 0;
        font-style: none;
        text-align: center;
        text-decoration: none;
        a{
        font-size: 0.8em;
        font-weight: 200;
        padding: 0.1em 0;
        text-decoration: none;
        font-style: none;
        }
      }
    }
    .form-control{
      width: auto;
    }
  }
  .v-select.single{
    .selected-tag{
      color: $color-2;
    }
  }
  .v-select-multiple{
    min-height: 2rem;
    height: auto;
    .selected-tag{
      color: $color-1;
      background-color: $color-2;
      border: none;
      .close{
        color: $color-1;
        padding: 0.1rem;
        border: none;
        border-left: 1px solid #00000020;
        text-shadow: none;
        opacity: 1;
        font-size: 1.2rem;
        margin-top: 0.5px;
        span{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1em;
          height: 1em;
          padding-bottom: 0.1em;
        }
      }
    }
    .form-control{
      width: 2.5rem !important;
    }
  }
</style>
