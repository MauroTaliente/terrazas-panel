<template>
  <div>
    <div class="box">
      <!-- Crea Promo -->
      
      <transition name="fade" mode="out-in">
      <section :class="['actionWindow first', displayAddAction]" v-if="showAdd">
        <form class="vue-form" @submit.prevent="createPromo">
          <span class="windowComander" v-on:click="toglleAction('fullAdd')">
            <i class="material-icons" 
               v-if="!showFullAddPromo">add_box</i>
            <i class="material-icons"
               v-if="showFullAddPromo">indeterminate_check_box</i>
          </span>
          <legend>Nueva Promo</legend>
          <span class="windowComander" v-on:click="resetPromo()">
            <i class="material-icons">
              loop
            </i>
          </span>
          <transition name="fade" mode="out-in">
            <div class="row" v-if="showFullAddPromo">
              <div class="item">
                <h4 class="label" for="name">Nombre</h4>
                <input type="text" name="name" id="name" required="" v-model="promo.name">
              </div>
              <div class="item">
                <h4 class="label" for="editor">Descripción</h4>
                <editor :text='promo.info'
                        :options='options'
                        v-on:edit='processEditOperation'>
                </editor>
              </div>          
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div class="row" v-if="showFullAddPromo">
              <div class="item">
                <label class="label" for="file">Imagen de la promo</label>
              </div>  
              <div class="imageArea">
                <label class="customUpload">
                <i class="material-icons">insert_photo</i><p>{{ uploadMessage }}</p>
                <input class="file"
                      type="file"
                      name="promoImage" 
                      @change="previewImage"
                      accept="image/*">
                </label>
                <transition name="fade" v-if="imageData.length > 0">
                <section>
                  <span type="buttom" class="btnCerrar" 
                        v-on:click="deleteImage()">
                        <i class="material-icons">highlight_off</i>
                  </span>
                  <img :src="imageData" :alt="promo.name">
                </section>
                </transition>
              </div>
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div class="row" v-if="showFullAddPromo">
              <div class="item date since"
                  v-on:click="setDate('since')">
                <div class="year">
                  <h4 class="label">Desde</h4>
                  <v-select v-model="sinceCreate.year"
                            :options="years">
                  </v-select>
                </div>
                <div class="month">
                  <h4 class="label">&nbsp;</h4>
                <v-select v-model="sinceCreate.month"
                          :options="months">
                  </v-select>
                </div>
                <div class="day">
                  <h4 class="label">&nbsp;</h4>
                  <v-select v-model="sinceCreate.day"
                            :options="days">
                  </v-select>
                </div>
              </div>
              <div class="item date until"
                  v-on:click="setDate('until')">
                <div class="year">
                  <h4 class="label">Hasta</h4>
                  <v-select v-model="untilCreate.year"
                            :options="years">
                  </v-select>
                </div>
                <div class="month">
                  <h4 class="label">&nbsp;</h4>
                <v-select v-model="untilCreate.month"
                          :options="months">
                  </v-select>
                </div>
                <div class="day">
                  <h4 class="label">&nbsp;</h4>
                  <v-select v-model="untilCreate.day"
                            :options="days">
                  </v-select>
                </div>
              </div>  
              <div class="item eventts">
                <h4 class="label">Eventos relacionados</h4>
                <v-select class="v-select-multiple"
                          v-model="promo.eventts"
                          :options="eventts"
                          label="title"
                          multiple>
                </v-select>
              </div>
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div class="row" v-if="showFullAddPromo">
              <div class="item">
                <h4 class="label" for="stores">Locales Adheridos / separar por ","</h4>
                <textarea class="stores" name="stores" id="stores" required="" 
                          v-model="promo.stores"></textarea>
              </div>
              <div class="item">
                <h4 class="label" for="legals">Legales</h4>
                <textarea class="legal" name="legals" id="legals" required="" 
                          v-model="promo.legals" ></textarea>
              </div>
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div class="launchArea" v-if="showFullAddPromo">
              <button class="btnImportant" type="submit">
                <i class="material-icons">launch</i> <span>Crear</span>
              </button>
            </div>
          </transition>
        </form>
      </section>
      </transition>

      <!-- Editar Promo -->
      <transition name="fade" mode="in-out">
        <section :class="['actionWindow', displayEditAction]" v-if="showEdit">
          <form class="vue-form" @submit.prevent="updatePromo">
            <span class="windowComander" v-on:click="toglleAction('fullEdit')">
              <i class="material-icons" 
                v-if="!showFullAddPromo">add_box
              </i>
              <i class="material-icons"
                v-if="showFullAddPromo">indeterminate_check_box
              </i>
            </span>
            <legend>Editando Promo</legend>
            <span class="windowComander" v-on:click="toglleAction('add'), resetPromo()" >
              <i class="material-icons">
                close
              </i>
            </span>
            <transition name="fade" mode="out-in">
              <div class="row">
                <div class="item">
                  <h4 class="label" for="name">Nombre</h4>
                  <input type="text" name="name" id="name" required="" v-model="promo.name">
                </div>
                <div class="item">
                  <h4 class="label" for="editor">Descripción</h4>
                  <editor :text='promo.info'
                          :options='options'
                          v-on:edit='processEditOperation'>
                  </editor>
                </div>          
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div class="row">
                <div class="item">
                  <label class="label" for="file">Imagen de la promo</label>
                </div>  
                <div class="imageArea">
                  <label class="customUpload">
                  <i class="material-icons">insert_photo</i><p>{{ uploadMessage }}</p>
                  <input class="file"
                        type="file"
                        name="promoImage" 
                        @change="previewImage"
                        accept="image/*">
                  </label>
                  <transition name="fade">
                    <section v-if="editImage">
                      <span type="buttom" class="btnCerrar" 
                            v-on:click="deleteImage()">
                            <i class="material-icons">highlight_off</i>
                      </span>
                      <img v-if="editImage" :src="url+editImage" :alt="promo.name">
                    </section>
                  </transition>
                  <transition name="fade">
                    <section v-if="imageData.length > 0">
                      <span type="buttom" class="btnCerrar" 
                            v-on:click="deleteImage()">
                            <i class="material-icons">highlight_off</i>
                      </span>
                      <img v-if="imageData" :src="imageData" :alt="promo.name">
                    </section>
                  </transition>
                </div>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div class="row">
                <div class="item date since"
                    v-on:click="setDate('since')">
                  <div class="year">
                    <h4 class="label">Desde</h4>
                    <v-select v-model="sinceCreate.year"
                              :options="years">
                    </v-select>
                  </div>
                  <div class="month">
                    <h4 class="label">&nbsp;</h4>
                  <v-select v-model="sinceCreate.month"
                            :options="months">
                    </v-select>
                  </div>
                  <div class="day">
                    <h4 class="label">&nbsp;</h4>
                    <v-select v-model="sinceCreate.day"
                              :options="days">
                    </v-select>
                  </div>
                </div>
                <div class="item date until"
                    v-on:click="setDate('until')">
                  <div class="year">
                    <h4 class="label">Hasta</h4>
                    <v-select v-model="untilCreate.year"
                              :options="years">
                    </v-select>
                  </div>
                  <div class="month">
                    <h4 class="label">&nbsp;</h4>
                  <v-select v-model="untilCreate.month"
                            :options="months">
                    </v-select>
                  </div>
                  <div class="day">
                    <h4 class="label">&nbsp;</h4>
                    <v-select v-model="untilCreate.day"
                              :options="days">
                    </v-select>
                  </div>
                </div>  
                <div class="item eventts">
                  <h4 class="label">Eventos relacionados</h4>
                  <v-select class="v-select-multiple"
                            v-model="promo.eventts"
                            :options="eventts"
                            label="title"
                            multiple>
                  </v-select>
                </div>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div class="row">
                <div class="item">
                  <h4 class="label" for="stores">Locales Adheridos / separar por ","</h4>
                  <textarea class="stores" name="stores" id="stores" required="" 
                            v-model="promo.stores"></textarea>
                </div>
                <div class="item">
                  <h4 class="label" for="legals">Legales</h4>
                  <textarea class="legal" name="legals" id="legals" required="" 
                            v-model="promo.legals" ></textarea>
                </div>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div class="launchArea">
                <button class="btnImportant" type="submit">
                  <i class="material-icons">redo</i> <span>Editar</span>
                </button>
              </div>
            </transition>
          </form>
        </section> 
      </transition>

      <!-- Elimiar Promo -->
      <transition name="fade">
        <section :class="['actionWindow', displayDeleteAction]" v-if="showDelete">
            <h1>Estas seguro de eliminar</h1>
        </section>    
      </transition>
    </div>

    <div class="messageArea">
      <transition name="fade">
        <p class="message errMessage" v-if="errorMenssage"> {{ errorMenssage }}</p>
        <p class="message okMessage" v-if="successMenssage"> {{ successMenssage }} </p>
      </transition>
    </div>

    <section>
      <div class="box promos-box">
        <h2>Todas las promos</h2>
        <div class="card-box" v-for="promo in promos" :key="promo._id">
            <div class="card">
            <h4>{{ promo.name }}</h4>
          <img :src="url+promo.promoImage" :alt="promo.name">
          <div class="controles">
            <button class="btn" v-on:click="getPromo('edit', promo)" >
              <i class="material-icons">border_color</i>
            </button>
            <button class="btn"
                    v-on:click="promoArchive(this.promo)">
              <i class="material-icons">folder</i> 
            </button>
            <button class="btn btnEliminar" 
                    :id="promo._id"
                    v-on:click="deletePromo(promo._id)">
              <i class="material-icons">delete</i>      
            </button>
            <div class="estado on" v-if="promo.validity.state == true">
              <i class="material-icons">done</i>
            </div>
            <div class="estado off" v-if="promo.validity.state == false">
              <i class="material-icons">not_interested</i>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <div class="debug">
      <pre><code>{{ $data }}</code></pre>
    </div> -->
  </div>
</template>

<script>

import helpers from '../helpers'
import axios from 'axios';
import moment,{ locale } from 'moment';
import vSelect from 'vue-select';
import editor from 'vue2-medium-editor';
import { setTimeout } from 'timers';

const urlPromo = `${helpers.api}promo`;
const urlEventt = `${helpers.api}eventt/simple`;
const config = { headers: { authorization: 'Bearer ' + localStorage.token,
                            'Content-Type': 'multipart/form-data' }}

export default {
  name: 'Promo',
  components: {
    vSelect,
    editor,
  },
  data: function() {
    return {
      url: helpers.url,
      showAdd: true,
      showFullAddPromo: true,
      showEdit: false,
      showDelete: false,
      errorMenssage: '',
      successMenssage: '',
      uploadMessage: '',
      imageData: '',
      setImage: '',
      editImage: '',
      text: '',
      options: {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'h3']
        }
      },
      years: ['2018','2019','2020','2021','2022'],
      months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      days: ['01','02','03','04','05','06','07','08','09','10',
             '11','12','13','14','15','16','17','18','19','20',
             '21','22','23','24','25','26','27','28','29','30','31'],
      sinceCreate:{
        year: '2018',
        month: '01',
        day: '01',
      },  
      untilCreate:{
        year: '2019',
        month: '01',
        day: '30',
      },
      promo:{
        _id: '',
        name: '',
        info: '',
        legals: `Pie legal`,
        promoImage: '', /* ARCHIVO IMAGEN PRINCIPAL */
        since: '',
        until: '',
        eventts: [],
        stores: ''
      },
      promos: [/* PROMOS */],
      eventts: [/* EVENTOS */]
    };
  },
  mounted (){
    this.getAllPromos();
    this.getAlleventts();
  },
  computed:{
    displayAddAction (){
      return (this.showAdd)? 'show' : ''
    },
    displayEditAction (){
      return (this.showEdit)? 'show' : ''
    },
    displayDeleteAction (){
      return (this.showDelete)? 'show' : ''
    }
  },
  methods:{
    processEditOperation: function (operation) {
      this.promo.info = operation.api.origElements.innerHTML
    },
    setDate (sou){
      let yearS = this.sinceCreate.year
      let monthS = this.sinceCreate.month
      let dayS = this.sinceCreate.day
      let yearU = this.untilCreate.year
      let monthU = this.untilCreate.month
      let dayU = this.untilCreate.day

      let dateS = `${yearS}-${monthS}-${dayS}`
      let dateU = `${yearU}-${monthU}-${dayU}`

      if (sou == 'since') {
        this.promo.since = `${dateS} 00:01`
      }else if (sou === 'until'){    
        this.promo.until = `${dateU} 00:01`
      }
    },
    toglleAction (section){
      switch (section) {
        case 'fullAdd':
          this.showFullAddPromo = !this.showFullAddPromo
        break;  
        case 'add':
          if (this.showAdd == false) {
            setTimeout(() => {
              this.showAdd = !this.showAdd              
            }, 210);
          }
          if (this.showEdit == true) {
            this.showEdit = !this.showEdit
          }
        break;
        case 'edit':
          if (this.showAdd == true) {
            this.showAdd = !this.showAdd
          }
          if (this.showEdit == false) {
            setTimeout(() => {
            this.showEdit = !this.showEdit              
            }, 210);
          }
        break;
        case 'delete':
          this.showDelete = !this.showDelete
        break;
      }
    },
    setMenssage (res){
      if (res.data.error) {
        this.errorMenssage = res.data.error
      }else{
        this.successMenssage = res.data.message
      }
      setTimeout(() => {
        this.errorMenssage = ''
        this.successMenssage = ''
      }, 2000);
    },
    previewImage (event){
      this.uploadMessage = 'subiendo'
      setTimeout(() => {
        this.uploadMessage = '';
      }, 2000);
      // Reference to the DOM input element
      let input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {

        this.setImage = input.files[0]
        // create a new FileReader to read this image and convert to base64 format
        let reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
        }
      },
      deleteImage (){
        this.editImage = '';
        this.imageData = '';
        this.uploadMessage = '';
      },

    // TRAEN LA DATA DE LA API
    getAlleventts (){
      axios.get( urlEventt ,config)   
      .then(res => {
        // this.setMenssage(res)
        this.eventts = res.data.eventts;     
      })
      .catch(error => {
        this.setMenssage(error)
      })
    },
    getAllPromos (){
      axios.get( urlPromo ,config)   
      .then(res => {
        // this.setMenssage(res)
        this.promos = res.data.promosOrder
      })
      .catch(error => {
        this.setMenssage(error)
      })
    },
    //CREARPROMO
    createPromo (e){
      this.setDate('since');
      this.setDate('until');

      let promoEvents = this.promo.eventts;
      let promoStores = this.promo.stores.split(',');

      let formData = new FormData();
          formData.append('name', this.promo.name);
          formData.append('info', this.promo.info);
          formData.append('promoImage', this.setImage, this.setImage.name);
          formData.append('legals', this.promo.legals);
          formData.append('since', this.promo.since);
          formData.append('until', this.promo.until);
          for (var i = 0; i < promoEvents.length; i++) { 
            formData.append('eventts', promoEvents[i]._id);
          }
          for (var i = 0; i < promoStores.length; i++) {
                  console.log(promoStores[i]);
            formData.append('stores', promoStores[i]);
          }
          
      axios.post(urlPromo, formData)
      .then(res =>{
        this.setMenssage(res)
        this.getAllPromos()
        this.resetPromo()
      })
    },
    getPromo (action, promo){
      this.toglleAction(action)
      this.promo = promo

      let storesEd = promo.stores.toString()
      this.promo.stores = storesEd

      let eventtsEd = this.promo.eventts
      let fullEvents = this.eventts;

      fullEvents = fullEvents.filter(function(el){ 
          return ~eventtsEd.indexOf(el._id)
      });

      this.promo.eventts = fullEvents
      this.editImage = promo.promoImage
      this.getAllPromos();
    },
    updatePromo (e){
      this.setDate('since');
      this.setDate('until');

      let promoEvents = this.promo.eventts;
      let promoStores = this.promo.stores.split(',');

      let formData = new FormData();
          formData.append('name', this.promo.name);
          formData.append('info', this.promo.info);
          if (this.editImage == '') {
            formData.append('promoImage', this.setImage, this.setImage.name);  
          }
          formData.append('legals', this.promo.legals);
          formData.append('since', this.promo.since);
          formData.append('until', this.promo.until);
          for (var i = 0; i < promoEvents.length; i++) { 
            formData.append('eventts', promoEvents[i]._id);
          }
          for (var i = 0; i < promoStores.length; i++) {
            formData.append('stores', promoStores[i]);
          }

      axios.patch(`${urlPromo}/${this.promo._id}`, formData)
      .then(res =>{
        this.setMenssage(res);
        this.getAllPromos();
        this.resetPromo();
        this.toglleAction('add')
      })
    },
    deletePromo (e){
      axios.delete( `${urlPromo}/${e}`, config)
      .then(res =>{
        this.getAllPromos()
      })
    },
    resetPromo (){
      this.imageData = '',
      this.setImage = '',
      this.editImage = '',
      this.promo = {
        name: '',
        info: '',
        legals: `Pie legal`,
        promoImage: '', /* ARCHIVO IMAGEN PRINCIPAL */
        since: '',
        until: '',
        eventts: [],
        promos: []
      }
    }
  }
}

</script>

<style lang="scss">

$cssCore: false;
$cssHelpers: false;
$devMode: false;
$gutter: 0;

$breakpoints : (
  s  : 0,
  m  : 640px,
  l  : 1024px,
  xl : 1440px
) !default;

  @import "~globscss/ed-grid.scss";
  @import "~globscss/main.scss";

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.210s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  //Editor Styles

  .medium-editor-element{
    @include flex;
    min-height: 103px;
    position: relative;
    overflow-y: scroll;
    width: 100%;
    padding: 0.6rem;
    font-size: 0.8rem;
    color: #000;
    background-color: #FFF;
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

  .messageArea{
    width: 100%;
    margin: 0 1rem;
  }
  .message{
    width: 100%;
    padding: 1em;
    min-height: auto;
    margin-bottom: 2em;
    border-radius: 0.4em;
  }
  .okMessage{
    background-color: $color-ok;
    color: $color-3;
    text-align: center;
    font-weight: 200;
  }
  .errMessage{
    background-color: $color-err;
    color: $color-3;
    text-align: center;
    font-weight: 200;
  }

    .box{
      @include flex;
      position: relative;
      @include monoItem;
      .actionWindow{
        position: relative;
        top: 0;
        left: 0;
      }
      .first {
        position: relative;
      }
    }
    section{
      width: 100%;
    }
    .btnImportant{
      align-self: flex-end;
      width: 100%;
      @include btnImportant;
    }

    .vue-form{
      @include flex;
      @include edItem(100);
      max-width: 1440px;
      margin-bottom: 2em;
      padding: 0 0.5rem;
      position: relative;
      justify-content: flex-start;
      align-items: flex-start;
      border-radius: 0.4em;
      background-color: $color-3;
      color: $color-5;
      border: 1px solid $color-fondo;
      box-shadow: 0px 0px 30px -10px $sombra;
      .launchArea{
        cursor: pointer;

        width: 100%;
        border-top: 2px solid $color-fondo;
        .btnImportant{
          position: relative;
          @include flex;
          justify-content: center;
          align-items: center;
          margin: 0.5rem 0;
          padding: 0.25em;
          span{
            position: absolute;
            display: flex;
            right: 1em;
            font-size: 1em;
            color: $color-fondo;
          }
        }
      }
      legend{
        width: calc(100% - 8em);
        padding: 1.5em 0;
        color: $color-5;
        border-bottom: 2px solid $color-fondo;
        font-size: 1em;
        font-weight: 200;
        letter-spacing: 0.1em;
        padding-bottom: 1em;
      }
      .windowComander{
        cursor: pointer;
        @include flex;
        width: 3.5em;
        font-size: 1.05em;
        padding: 1.2em 1em 0.8em 1em;
        border-bottom: 2px solid $color-fondo;
        &:hover{
          color: $color-4;
          i{
            text-shadow: 0 2px 10px $color-3;
          }
        }
      }
      .row{
        padding: 0.5rem;
        @include flex;
        @include edItem(100, 50, 25, 25);
        flex-direction: column;
      }
      .item {
        @include flex;
        @include edItem(100);
        position: relative;
        margin: 0.5em 0;
      }
      h4{
        padding-bottom: 0.5rem;
      }
      .stores, .legal{
        min-height: 68.5px;
      }
      .date{
        justify-content: space-between;
        .form-control{
          font-size: 0.8em;
          font-weight: 100;
          text-align: center;
          padding: 0px 14px 0px 0px;
        }
        .selected-tag{
          position: absolute;
        }
      }
      .since{
        position: relative
      }
      .eventts{
        .form-control{
          width: 3em !important;
        }
      }
      .label {
        font-size: 0.8em;
        font-weight: 200;
      }
      input[type="text"],
      input[type="email"],
      textarea,
      select{
        width: 100%;
        max-height: 34px;
        padding: 0.6rem;
        font-size: 0.8rem;
        border: none;
        background-color:$color-1;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px $sombra;
      }
      .file{
        display: none;
      }
      .imageArea{
        @include flex;
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
          @include flex;
          position: absolute;
          justify-content: center;
          align-items: center;
          border-radius: 0.2em;
          height: 11.6em;
        }
        .customUpload{
        @include flex;
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
      }
      .year{
        @include edItem(34)
      }
      .month{
        @include edItem(30)
      }
      .day{
        @include edItem(30)
      }
    }

    .tns-controls{
      margin: 0.5em;
      button{
        @include btn;
        @include btnControl;
      }
    }
    .promos-box{
      padding: 0 0.5rem;
      background-color: $color-3;
      border-radius: 0.4em;
      border: 1px solid $color-fondo; 
      box-shadow: 0px 0px 30px -10px $sombra;
      h2{
        width: 100%;
        padding: 1.5em 1em 1em 1.5em;
        color: #9F9F9F;
        border-bottom: 2px solid #414255;
        font-size: 1em;
        font-weight: 200;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
      }
    }
    .card-box{
      @include flex;
      @include  edItem(100, 50, 33.33, 25);
      padding: 0 0.5rem;
    }
    .card{
      @include flex;
      width: 100%;
      margin-bottom: 1rem;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1em 0;
      border-radius: 0.2em;
      background-color: $color-6;
      color: $color-5;
      border: 1px solid $color-fondo; 
      h4{
        @include flex;
        font-size: 1em;
        font-weight: 300;
        align-self: flex-start;
        letter-spacing: 0.1em;
        padding-bottom: 1em;
        padding-left: 1.5em;
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
        width: 3em;
        height: 3em;
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
        padding: 0.2rem;
        background-color:  rgba($color-3, 1);
        transition: 0.2s ease all;
        i{
          font-size: 1.2rem;
        }
      }
    }

    .on{
      color: $color-ok !important;
    }
    .off{
      color: $color-err !important;
    }


</style>
