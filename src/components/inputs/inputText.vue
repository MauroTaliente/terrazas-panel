<template>
  <div class="item">
    <h4 class="label"
        v-if="name"
        :for="name">
         {{ name }}
    </h4>
    <input :type="type" 
          :name="name"
          :placeholder="place"
          :id="name"
          :required="required"
          v-model="value"
          @input="updateInput()">

      <!-- <pre><code>{{ $props }}</code></pre> -->
  </div>


</template>

<script>

import { Bus } from '../../helpers/Bus.js'

export default {
  name: 'inputText',
  props: {
    name: '',
    type: {type: String, default: 'text'},
    place: '',
    required: '',
    oNmodel: '',
  },
  data (){
    return{
      value: '',
    }
  },
  methods: {
    updateInput() {
      this.$emit('input', this.value);
    },
    reset() {
      this.value = '';
    },
    update() {
      this.value = this.$props.oNmodel 
    }
  },
  created() {
    Bus.$on('reset', this.reset)
    Bus.$on('update', this.update)
  }
}
</script>

<style lang="scss">

  @import "~globscss/main.scss";
  
  input{
    width: 100%;
    max-height: 34px;
    padding: 0.6rem;
    font-size: 0.8rem;
    border: none;
    background-color: $color-1;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px $sombra;
  }
  
</style>

