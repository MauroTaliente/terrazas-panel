<template>
  <div class="item">
    <h4 class="label"
        v-if="name"
        :for="name">
         {{ name }}
    </h4>
    <div :class="['swich', change]"
          @click="pom">
      <transition name="fade" mode="in-out">
        <div class="booleanOff" v-if="!value">
          <svg version="1.1" class="off"
              viewBox="0 0 24 24">
            <path d="M7,17h10c2.8,0,5-2.2,5-5s-2.2-5-5-5H7c-2.8,0-5,2.2-5,5S4.2,17,7,17z M7,9c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S5.3,9,7,9z"/>
          </svg>
          <p>
            {{ textOff }}
          </p>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div class="booleanOn" v-if="value">
          <svg version="1.1" class="off"
              viewBox="0 0 24 24">
            <path d="M17,7H7c-2.8,0-5,2.2-5,5s2.2,5,5,5h10c2.8,0,5-2.2,5-5S19.8,7,17,7z M17,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S18.7,15,17,15z"/>
          </svg>
          <p>
            {{ textOn }}
          </p>
        </div>
      </transition>
    </div>

      <!-- <pre><code>{{ $props }}</code></pre> -->
  </div>


</template>

<script>

import { Bus } from '../../helpers/Bus.js'

export default {
  name: 'inputText',
  props: {
    name: '',
    textOn: '',
    textOff: '',
    state: {type: Boolean},
    oNmodel: '',
  },
  data (){
    return{
      value: false,
    }
  },
  computed:{
    change (){
      return (this.value)? 'onOn' : ''
    }
  },
  methods: {
    pom() {
      this.$emit('input', !this.value);
      this.value = !this.value
    },
    reset() {
      this.value = false;
    },
    update() {
      this.value = this.$props.oNmodel 
    }
  },
  created() {
    if (this.state) {
      this.value = true;
    }
    Bus.$on('reset', this.reset)
    Bus.$on('update', this.update)
  }
}
</script>

<style lang="scss">

  @import "~globscss/main.scss";
  
  .swich{
    display: flex;
    width: 100%;
    position: relative;
    height: 34px;
    .booleanOff,
    .booleanOn{
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
      border: 1.5px solid $color-5;
      border-radius: 0.4rem;
      padding: 0 0.5rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      min-width: 100%;
      height: 31px;
    }
    svg{
      height: 31px;
      width: 34px;
    }
    path{
      font-size: 2rem;
      fill: $color-5;
    }
    p{
      color: $color-5;
      display: flex;
      padding-left: 0.4rem;
      font-size: 0.7rem;
      font-weight: 200;
    }
  }

  .onOn{
    path{
      fill: $color-1;
    }
    .booleanOn{
     background-color: $color-2;
     border: 1.5px solid $color-2;   
    }
    p{
      color: $color-4;
    }
  }
  
</style>

