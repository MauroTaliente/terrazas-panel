<template>
  <div>
    <div class="slider">
      <div v-for=" promo in promos " :key="promo._id">
        <div class="card">
          <h4>{{ promo.name }}</h4>
         <img :src="promo.promoImage" alt="">
         <div class="controles">
           <button class="btn" v-on:click="promoEdit()">Editar</button>
           <button class="btn" v-on:click="promoArchive()">Archivar</button>
           <button class="btn btnEliminar" v-on:click="promoArchive()">Eliminar</button>
           <div class="estado">nn</div>
         </div>
        </div>
      </div>
    </div>
    <form class="vue-form" @submit.prevent="onUpload">
      <fieldset>    
        <legend>Crear Promo</legend>
        <div>
          <label class="label" for="name">Nombre</label>
          <input type="text" name="name" id="name" required="" v-model="promo.name">
        </div>
        <div>
          <label class="label" for="textarea">Legales</label>
          <textarea class="legal" name="textarea" id="textarea" required="" 
                  v-model="promo.text" ></textarea>
        <!-- <span class="counter">{{ legal.text.length }} / {{ legal.maxlength }}</span> -->
      </div>
      <div>
        <input type="file" @change="onFileChanged">
      </div>
      <div>
        <datepicker :format="customFormatterSince"></datepicker>
        <datepicker :format="customFormatterUntil"></datepicker>
      </div>
        <input type="submit" value="Upload!">
      </fieldset>
    </form>
    <div class="debug">
      <pre><code>{{ $data }}</code></pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

import { tns } from 'tiny-slider/src/tiny-slider.module.js';

const urlPromo = 'http://localhost:3000/api/promo';
const config = { headers: { authorization: 'Bearer ' + localStorage.token,
                            'Content-Type': 'multipart/form-data' }}

export default {
  name: 'Promo',
  components: {
    Datepicker
  },
  created: function() {
    this.getAllPromos();
  },
  data: function() {
    return {
      showAdd: true,
      showEdit: false,
      showDelete: false,
      errorMenssage: '',
      sucessMenssage: '',
      promos: [/* PROMOS */],
      promo:{
        name: '',
        text: `Pie legal`,
        selectedFile: null, /* ARCHIVO IMAGEN PRINCIPAL */
        since: '',
        until: '',
      }
    };
  },
  mounted (){
    this.getAllPromos();
  },
  computed:{
    displayAddAction (){

    },
    displayEditAction (){

    },
    displayDeleteAction (){

    }
  },
  methods: {
    toggleAction (){

    },
    setMenssage (){

    },
    // get datos del servidor
    getAllPromos (){
      axios.get( urlPromo ,config)   
      .then(response => {
        this.promos = response.data.promosValid
      })
      .then( sliderCreate => {
        var slider = tns({
          container: '.slider',
          responsive: {
            640: {
              items: 2
            },
            900: {
              items: 2
            },
            1300: {
              items: 3
            },
            1640: {
              items: 4
            },
            2100: {
              items: 5
            }            
          },
          slideBy: 'page',
          autoplay: false,
          gutter: 20,
        });
      })
      .catch(error => {
        console.log(error);
      })
    },
    createPromo (){

    },
    getPromo (){

    },
    updatePromo (){

    },
    deletePromo (){

    },




    //VIEJO
    customFormatterSince (date){
      let fecha = moment(date).format('YYYY-MM-DD HH:mm');
      this.promo.since = fecha
      return fecha;
    },
    customFormatterUntil (date){
      let fecha = moment(date).format('YYYY-MM-DD HH:mm');
      this.promo.until = fecha
      return fecha;
    },
    // Relacionados a las Imagenes
    onFileChanged (event){
      this.promo.selectedFile = event.target.files[0]
    },
    onUpload (){
      // upload file
      let formData = new FormData();

          formData.append("name", this.promo.name);
          formData.append("legals", this.promo.text);
          formData.append("since", this.promo.since);
          formData.append("until", this.promo.until);
          formData.append("promoImage", this.promo.selectedFile);
          
      axios.post(urlPromo, formData)
    }
  }
}

</script>

<style lang="scss">
 
    @import "~globscss/main.scss";
    @import "~globscss/slider.scss";

    .tns-controls{
      margin: 0.5em;
      button{
        @include btn;
        @include btnControl;
      }
    }
    
    .slider{
      @include flex;
      padding: 20px 0;
      .tns-item{
        padding: 0.4em;
      }
    }
    .card{
      @include flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1em 0;
      border-radius: 0.4em;
      background-color: $color-3;
      color: $color-5;
      border: 1px solid $color-fondo; 
      box-shadow: 0px 20px 40px -20px $sombra;
      h4{
        font-size: 0.8em;
        font-weight: 200;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        padding-bottom: 1em;
      }
      .controles{
        @include flex;
        width: 100%;
        padding: 1em 0 0 0;
        justify-content: center;
        .btn, .estado{
          padding: 0.5em 1em;
          margin: 0 0.5em;
        }
      }
      .estado{
        position: absolute;
        width: 4em;
        height: 4em;
        display: flex;
        top: 4.5em;
        right: 1em;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        border-radius: 100%;
        font-weight: 400;
        text-transform: uppercase;
        color: $color-4;
        background-color: $color-5;
        transition: 0.2s ease all;
      }
    }
</style>
