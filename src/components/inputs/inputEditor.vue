<template>
  <div class="item">
    <h4 class="label"
        v-if="name"
        :for="name">
      {{ name }}
    </h4>
    <editor :text='value'
            ref="content"
            :options='options'
            v-on:edit='processEditOperation'>
    </editor>
    <!-- <pre><code>{{ $data }}</code></pre> -->
  </div>
</template>

<script>

import { Bus } from '../../helpers/Bus.js'
import editor from 'vue2-medium-editor';

export default {
  name: 'inputText',
  components:{
    editor
  },
  props: {
    name: '',
    oNmodel: ''
  },
  data (){
    return{
      value: '',
      options: {
        toolbar: {
          buttons: ['bold','italic','h3','h2','h1','justifyCenter','justifyLeft']
        },
        static: true,
        align: ['center'],
      }
    }
  },
  methods: {
    processEditOperation (operation){
      this.value = operation.api.origElements.innerHTML
      this.$emit('input', this.value);
    },
    reset() {
      this.value = '';
    },
    update() {
      setTimeout(() => {
        this.value = this.$props.oNmodel
      }, 100);
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

.medium-editor-element{
  display: block;
  min-height: 103px;
  position: relative;
  overflow: auto;
  resize: both;
  width: 100%;
  padding: 0.6rem;
  font-size: 0.8rem;
  color: #000;
  background-color: $color-1;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px $sombra;
}
.medium-editor-toolbar{
  display: none;
  position: absolute;
  z-index: 20;
  border-radius: 0.4em;
  overflow: hidden;
  border: 1px solid $color-fondo;
  box-shadow: 0px 0px 20px 0px rgba(10, 12, 16, 0.75);
  &:hover{
  border: 1px solid $color-2;
  }
  .medium-editor-toolbar-actions{
    margin: 0;
    li{
      margin: 0;
    }
    .medium-editor-action{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background-color: $color-3;
      border: none;
      text-decoration: none;
      color: $color-5;
      &:hover{
        color: $color-1;
        background-color: $color-6;
      }
    }
  }
}
.medium-toolbar-arrow-under{
  display: none;
}
.medium-editor-toolbar-active{
  display: flex;
  background-color: #414255;
}

</style>

