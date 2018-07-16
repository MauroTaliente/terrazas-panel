<template>
  <div class="item">
    <h4 class="label" for="file">
      {{ name }}
    </h4>
    <div class="imageArea">
      <label class="customUpload">
        <i class="material-icons">insert_photo</i>
        <p>{{ uploadMessage }}</p>
        <input class="file"
              type="file"
              name="promoImage"
              @change="previewImage"
              @input="updateInput"
              accept="image/*">
      </label>
      <transition name="fade">
        <section v-if="editImagePath">
          <span type="buttom" class="btnCerrar" 
                v-on:click="deleteImage()">
                <i class="material-icons">highlight_off</i>
          </span>
          <img :src="editImagePath" :alt="`prev ${name}`">
        </section>
      </transition>
      <transition name="fade">
        <section v-if="imageData">
          <span type="buttom" class="btnCerrar" 
                v-on:click="deleteImage()">
                <i class="material-icons">highlight_off</i>
          </span>
          <img v-if="imageData" :src="imageData" :alt="`new ${name}`">
        </section>
      </transition>
    </div>
  <!-- <pre><code>{{ $data }}</code></pre> -->
  </div>
</template>

<script>

import { Bus } from '../../helpers/Bus.js'
import helpers from '../../helpers'
let url = helpers.url

export default {
  name: 'inputImage',
  props: {
    name: '',
    editImage: '',
    required: {
      type: Boolean,
    },
  },
  data (){
    return{
      value: '',
      setImage: '',
      editImagePath: '',
      imageData: '',
      uploadMessage: '',
    }
  },
  methods: {
    previewImage (event){
      this.uploadMessage = 'subiendo'
      setTimeout(() => {
        this.uploadMessage = '';
      }, 1000);
   
      let input = event.target;
      if (input.files && input.files[0]) {
        this.setImage = input.files[0]
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
      
    },
    deleteImage (){
      this.editImagePath = '';
      this.setImage = '';
      this.editImagePath = '';
      this.imageData = '';
      setTimeout(() => {
        this.$emit('input', 'delete');     
      }, 20);
    },
    resetImage (){
      this.editImagePath = '';
      this.setImage = '';
      this.uploadMessage = '';
      this.imageData = '';
      setTimeout(() => {
        this.$emit('input', '');     
      }, 10);
    },
    updateInput (){  
      setTimeout(() => {
        this.$emit('input', this.setImage);
      }, 1);
    },
    update() {
      if (this.$props.editImage !== '') {
        let img = helpers.url + this.$props.editImage
        this.editImagePath = img
      }else {
        setTimeout(() => {
          this.editImagePath = ''        
        }, 10);
        this.imageData = '';
      }

    }
  },
  created() {
    Bus.$on('reset', this.resetImage)
    Bus.$on('update', this.update)
  }
}
</script>

<style lang="scss" scoped>

      @import "~globscss/main.scss";

      .file{
        display: none;
      }
      .imageArea{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: -0rem;
        margin-bottom: 0.5rem;
        justify-content: center;
        align-items: center;
        border-radius: 0.2em;
        height: 11rem;
        background-color: $color-fondo;
        position: relative;
        overflow: hidden;
        section{
          display: flex;
          flex-wrap: wrap;
          position: absolute;
          justify-content: center;
          align-items: center;
          border-radius: 0.2em;
          height: 11.6em;
        }
        .customUpload{
        display: flex;
        flex-wrap: wrap;
        @include btnImportant;
        border-radius: 4em;
        justify-content: center;
        align-items: center;
        padding: 0;
        i{
          padding: 1rem;
        }
        p{
          font-weight: 200;
        }
        }
        .btnCerrar{
          cursor: pointer;
          position: absolute;
          color: $color-err;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          border-radius: 0 0 2em 2em;
          background-color: $color-1;
          padding: 0.6em 0.1em 0.1em 0.1em;
          right: 0.5em;
          top: 0em;
          i{
            font-size: 2em;
          }
        }
      }
</style>

