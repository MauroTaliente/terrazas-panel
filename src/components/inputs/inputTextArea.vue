<template>
  <div class="item">
    <h4 class="label" :for="name">{{ name }} {{ desc }}</h4>
    <textarea  :name="name"
               :id="name"
               :required="required"
               v-model="value"
               @input="updateInput()">
    </textarea>
  </div>
</template>

<script>

import { Bus } from '../../helpers/Bus.js'

export default {
  name: 'inputText',
  props: {
    name: '',
    desc: '',
    oNmodel: '',
    required: {
      type: Boolean,
      },
  },
  data (){
    return{
      value: '',
    }
  },
  methods:{
    updateInput () {
        this.$emit('input', this.value);
    },
    reset (){
      this.value = '';
    },
    update() { 
      this.value = this.$props.oNmodel 
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

  textarea{
    width: 100%;
    height: 68.5px;
    padding: 0.6rem;
    font-size: 0.8rem;
    border: none;
    background-color:$color-1;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px $sombra;
  }

</style>

