<template>
  <div class="inVue">
    <div class="content">

      <!-- Editar y Crear Promo -->
      <transition name="fade" mode="out-in">
        <section id="form"
          class="actionWindow">
          <superForm
            v-on:emitToggle="toglleAction('fullForm')"
            v-on:emitClose="setForm('add')"
            v-on:emitReset="resetPromo"
            v-on:send="sendForm()"
            :name="formCard.name"
            :type="formCard.type"
            :swich="showFullForm">
            <section class="content"
                    v-show="showFullForm">
              <div class="row">
                <inputText name='Nombre'
                            required
                            :oNmodel="promo.name"
                            v-model="promo.name">
                </inputText>
                <inputEditor name='Descripción'
                            :oNmodel="promo.info"
                            v-model="promo.info">
                </inputEditor>
              </div>
              <div class="row">
                <inputImage
                  name="Imagen de la promo"
                  :editImage="editImage"
                  v-model="selectImage">
                </inputImage>
              </div>
              <div class="row">
                  <inputDate
                    name="Desde"
                    :oNmodel="promo.since"
                    v-model="promo.since">
                  </inputDate>
                  <inputDate
                    name="Hasta"
                    :oNmodel="promo.until"
                    v-model="promo.until">
                  </inputDate>
                  <inputSelect
                    name="Eventos relacionados"
                    :oNmodel="selectEventts"
                    v-model="selectEventts"
                    :options="eventts"
                    label="title"
                    multiple>
                  </inputSelect>
              </div>
              <div class="row">
                <inputTextArea
                  class="stores"
                  name="Locales"
                  desc=" Adheridos / separar por comas"
                  :oNmodel="promo.stores"
                  v-model="promo.stores">
                </inputTextArea>
                <inputTextArea
                  class="legals"
                  name="Legales"
                  :oNmodel="promo.legals"
                  v-model="promo.legals">
                </inputTextArea>
              </div>
            </section>
          </superForm>
        </section>
      </transition>

      <div class="messageArea">
        <transition name="fade">
          <p class="message errMessage" v-if="errorMenssage"> {{ errorMenssage }}</p>
          <p class="message okMessage" v-if="successMenssage"> {{ successMenssage }} </p>
        </transition>
      </div>

      <transition name="fade" mode="out-in">
        <section class="promosCard">
          <div class="header">
            <h2>Todas las Promos</h2>
          </div>
          <div class="promosContainer">
            <div class="promoContainer" v-for="promo in promos" :key="promo._id">
              <div class="promoCard">
                <h4>{{ promo.name }}</h4>
                <img v-if="promo.promoImage"
                  :src="url+promo.promoImage"
                  :alt="promo.name">
                <img v-if="!promo.promoImage"
                  src="/dist/none.jpg"
                  :alt="promo.name">
                <div class="controles">
                  <button class="btn"
                    v-scroll-to="'#form'"
                    v-on:click="getPromo('form', promo)" >
                    <i class="material-icons">border_color</i>
                  </button>
                  <button class="btn"
                          v-on:click="promoArchive(promo)">
                    <i class="material-icons">folder</i>
                  </button>
                  <button class="btn btnEliminar"
                          v-on:click="toglleAction('delete', promo._id)">
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
      </transition>

    </div>

    <!-- Elimiar Promo -->
    <transition name="fade" mode="out-in">
      <alert
        :class="[displayDeleteAction]"
        v-if="showDelete"
        acpText="Eliminar"
        canText="Cancelar"
        v-on:can="toglleAction('delete')"
        v-on:acp="deletePromo"
        name="Eliminar"
        text="Estas seguro que queres eliminar esta promo?"
        :elId="promo._id">
      </alert>
    </transition>

  </div>
</template>

<script>

import helpers from '../helpers'
import axios from 'axios';
import moment,{ locale } from 'moment';

import { Bus } from '../helpers/Bus.js'

import superForm from './superForm'
import inputText from './inputs/inputText'
import inputEditor from './inputs/inputEditor'
import inputImage from './inputs/inputImage'
import inputDate from './inputs/inputDate'
import inputSelect from './inputs/inputSelect'
import inputTextArea from './inputs/inputTextArea'

import Alert from './alerts/Alert'

const urlPromo = `${helpers.api}promo`;
const urlEventt = `${helpers.api}eventt/simple`;
const config = { headers: { authorization: 'Bearer ' + localStorage.token,
                            'Content-Type': 'multipart/form-data' }}


export default {
  name: 'Promo',
  components: {
    superForm,
    inputText,
    inputEditor,
    inputImage,
    inputDate,
    inputSelect,
    inputTextArea,
    Alert
  },
  data () {
    return {
      url: helpers.url,
      formCard: {
        name:  'Nueva Promo',
        type: 'add'
      },
      showFullForm: true,
      showDelete: false,
      errorMenssage: '',
      successMenssage: '',
      uploadMessage: '',
      editImage: '',
      selectImage: '',
      selectEventts: [],
      promo:{
        _id: '',
        name: '',
        info: '',
        legals: `Pie legal`,
        promoImage: '', /* ARCHIVO IMAGEN PRINCIPAL */
        since: '2018-01-01 00:01',
        until: '2018-01-01 00:01',
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
      return (this.showAdd)? 'showWow' : ''
    },
    displayEditAction (){
      return (this.showEdit)? 'showWow' : ''
    },
    displayDeleteAction (){
      return (this.showDelete)? 'showWow' : ''
    }
  },
  methods:{
    setForm (action, id){
      switch (action) {
        case 'add':
          this.formCard = {
            name: 'Nueva Promo',
            type: 'add'
          }
          this.resetPromo();
          break;
        case 'edit':
          this.formCard = {
            name: 'Editando Promo',
            type: 'edit'
          }
          break;
      }
    },
    sendForm (){
      let type = this.formCard.type
      if (type == 'add') {
        this.createPromo()
        this.setForm('edit')
      }else if (type == 'edit') {
        this.updatePromo()
        this.setForm('add')
      }
    },
    toglleAction (section, id){
      switch (section) {
        case 'fullForm':
          this.showFullForm = !this.showFullForm
        break;
        case 'delete':
          this.promo._id =  id
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
    //PROMO
    createPromo(e) {
      let promoEvents = this.selectEventts;
      let promoStores = this.promo.stores.split(',');
      let image = this.selectImage;

      let formData = new FormData();
      formData.append('_id', helpers.mongoObjectId());
      formData.append('name', this.promo.name);
      formData.append('info', this.promo.info);
      formData.append('promoImage', image, image.name);
      formData.append('legals', this.promo.legals);
      formData.append('since', this.promo.since);
      formData.append('until', this.promo.until);
      for (var i = 0; i < promoEvents.length; i++) {
        formData.append('eventts', promoEvents[i]._id);
      }
      for (var i = 0; i < promoStores.length; i++) {
        formData.append('stores', promoStores[i]);
      }

      // for (var pair of formData.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]);
      // }

      axios.post(urlPromo, formData)
        .then(res => {
          this.setMenssage(res)
          this.getAllPromos()
          this.resetPromo()
        })
    },
    getPromo (action, promo){
      this.toglleAction(action)
      this.promo = promo
      this.promo.since = promo.validity.since
      this.promo.until = promo.validity.until

      let storesEd = promo.stores.toString()
      this.promo.stores = storesEd

      let eventtsEd = this.promo.eventts
      let fullEvents = this.eventts;


      let selectEventts = []
      for (let i = 0; i < eventtsEd.length; i++) {
        fullEvents.map(function(x) {
           if (x._id == eventtsEd[i]) {

             selectEventts.push(x)
           } ;
        });
      }

      this.selectEventts = selectEventts

      if(promo.promoImage == 'delete'){
        this.editImage = '';
      }
      this.editImage = promo.promoImage

      this.setForm('edit', promo._id);
      this.getAllPromos();
      setTimeout(() => {
        Bus.$emit('update');
      }, 10);
    },
    updatePromo (){

      let promoEvents = this.selectEventts;
      let promoStores = this.promo.stores.split(',');
      let image = this.selectImage

      let formData = new FormData();
          formData.append('name', this.promo.name);
          formData.append('info', this.promo.info);
          if (image) {
            formData.append('promoImage', image, image.name);
          }else if(this.promo.promoImage == 'delete'){
            formData.append('promoImage', 'delete')
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
    promoArchive (e){
      console.log('Esta funcion es para archivar la promo');
      return
    },
    deletePromo (e){
      axios.delete( `${urlPromo}/${e}`, config)
      .then(res =>{
        this.getAllPromos()
      })
    },
    resetPromo (){
      console.log('reset');
      this.editImage = ''
      this.promo = {
        name: '',
        info: '',
        legals: `Pie legal`,
        promoImage: '', /* ARCHIVO IMAGEN PRINCIPAL */
        since: '2018-01-01 00:01',
        until: '2018-01-01 00:01',
        eventts: [],
        promos: []
      }
      Bus.$emit('reset');
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

  section{
    width: 100%;
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

  //PROMOS CARDS
  .promosCard{
    @include flex;
    @include edContainer;
    @include blueCard;
    @include headerCard;
  }
  .promosContainer{
    @include flex;
    width: 100%;
    padding: 1em 0 0 0;
    border-top: 2px solid $color-fondo;
  }
  .promoContainer{
    @include flex;
    @include  edItem(100, 50, 25, 25);
    padding: 0 0.5rem;
  }
  .promoCard{
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

  //ON-OFF
  .on{
    color: $color-ok !important;
  }
  .off{
    color: $color-err !important;
  }

</style>
