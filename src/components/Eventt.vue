<template>
  <div class="inVue">
    <div class="content">

      <!-- Crear y Editar Eventt -->
      <transition name="fade" mode="out-in">
        <section id="form"
          class="actionWindow">
          <superForm
            v-on:emitToggle="toglleAction('fullForm')"
            v-on:emitClose="setForm('add')"
            v-on:emitReset="resetEventt"
            v-on:send="sendForm()"
            :name="formCard.name"
            :type="formCard.type"
            :swich="showFullForm">
            <section class="content"
                    v-show="showFullForm">
              <div class="row">
                <inputText name='Nombre'
                            required
                            :oNmodel="eventt.title"
                            v-model="eventt.title">
                </inputText>
                <inputEditor name='Descripción corta'
                             :oNmodel="eventt.shortInfo"
                            v-model="eventt.shortInfo">
                </inputEditor>
              </div>
              <div class="row">
                <inputImage
                  name="Imagen principal"
                  :editImage="eventtImageEdit"
                  v-model="eventtImageSelect">
                </inputImage>
              </div>
              <div class="row">
                <inputImage
                  name="Imagen de portada"
                  :editImage="eventtCoverEdit"
                  v-model="eventtCoverSelect">
                </inputImage>
              </div>
              <div class="row">
                  <inputDate
                    name="Desde"
                    :oNmodel="eventt.since"
                    v-model="eventt.since">
                  </inputDate>
                  <inputDate
                    name="Hasta"
                    :oNmodel="eventt.until"
                    v-model="eventt.until">
                  </inputDate>
                  <inputSelect
                    name="Promos relacionados"
                    :oNmodel="selectPromos"
                    v-model="selectPromos"
                    :options="promos"
                    label="name"
                    multiple>
                  </inputSelect>
              </div>
              <div class="row l75">
                <inputEditor name='Descripción Larga'
                  :oNmodel="eventt.info"
                  v-model="eventt.info">
                </inputEditor>
              </div>
              <div class="row l25">
                <div class="a50">
                <inputText name="Dia"
                            place="03 de Marzo"
                            :oNmodel="eventt.day"
                            v-model="eventt.day">
                </inputText>
                </div>
                <div class="a50">
                <inputText name="Hora"
                            place="20:45hs"
                            :oNmodel="eventt.hour"
                            v-model="eventt.hour">
                </inputText>
                </div>
                <inputBoolean
                  name="Tipo de evento"
                  :oNmodel="eventt.type"
                  v-model="eventt.type"
                  :state="eventt.type"
                  textOn="Evento destacado"
                  textOff="Evento simple">
                </inputBoolean>
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
        <section class="eventtsCard">
          <div class="header">
            <h2>Todos los Eventos</h2>
          </div>
          <div class="eventtsContainer">
            <div class="eventtContainer" v-for="eventt in eventts" :key="eventt._id">
              <div class="eventtCard">
                <h4>{{ eventt.title }}</h4>
                <img v-if="eventt.eventtImage"
                  :src="url+eventt.eventtImage"
                  :alt="eventt.title">
                <img v-if="!eventt.eventtImage"
                  src="/dist/none.jpg"
                  :alt="eventt.title">
                <div class="controles">
                  <button class="btn"
                    v-scroll-to="'#form'"
                    v-on:click="getEventt('edit', eventt)" >
                    <i class="material-icons">border_color</i>
                  </button>
                  <button class="btn"
                          v-on:click="eventtArchive(this.eventt)">
                    <i class="material-icons">folder</i>
                  </button>
                  <button class="btn btnEliminar"
                          v-on:click="toglleAction('delete', eventt._id)">
                    <i class="material-icons">delete</i>
                  </button>
                  <div class="estado on" v-if="eventt.validity.state == true">
                    <i class="material-icons">done</i>
                  </div>
                  <div class="estado off" v-if="eventt.validity.state == false">
                    <i class="material-icons">not_interested</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </transition>

    </div>

    <!-- Elimiar eventt -->
    <transition name="fade" mode="out-in">
      <alert
        :class="[displayDeleteAction]"
        v-if="showDelete"
        acpText="Eliminar"
        canText="Cancelar"
        v-on:can="toglleAction('delete')"
        v-on:acp="deleteEventt"
        name="Eliminar"
        text="Estas seguro que queres eliminar este evento"
        :elId="eventt._id">
      </alert>
    </transition>

      <!-- <div class="debug">
        <pre><code>{{ $data }}</code></pre>
      </div> -->

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
import inputBoolean from './inputs/inputBoolean'

import Alert from './alerts/Alert'

const urlEventt = `${helpers.api}eventt`;
const urlPromo = `${helpers.api}promo/simple`;
const config = { headers: { authorization: 'Bearer ' + localStorage.token,
                            'Content-Type': 'multipart/form-data' }}

export default {
  name: 'Eventt',
  components: {
    superForm,
    inputText,
    inputEditor,
    inputImage,
    inputDate,
    inputSelect,
    inputTextArea,
    inputBoolean,
    Alert
  },
  data () {
    return {
      url: helpers.url,
      formCard: {
        name:  'Nuevo Evento',
        type: 'add'
      },
      showFullForm: true,
      showDelete: false,
      errorMenssage: '',
      successMenssage: '',
      uploadMessage: '',
      eventtImageEdit: '',
      eventtCoverEdit: '',
      eventtImageSelect: '',
      eventtCoverSelect: '',
      selectPromos: [],
      eventt:{
        _id: '',
        title: '',
        type: false,
        info: '',
        shortInfo: '',
        eventtImage: '', /* ARCHIVO IMAGEN PRINCIPAL */
        eventtCover: '', /* ARCHIVO IMAGEN PORTADA */
        since: '2018-01-01 00:01',
        until: '2018-01-03 00:01',
        day: '',
        hour: '',
        promos: []
      },
      eventts: [/* EVENTOS */],
      promos: [/* PROMOS */]
    };
  },
  mounted (){
    this.getAllEventts();
    this.getAllPromos();
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
            name: 'Nuevo Evento',
            type: 'add'
          }
          this.resetEventt();
          break;
        case 'edit':
          this.formCard = {
            name: 'Editando Evento',
            type: 'edit'
          }
          break;
      }
    },
    sendForm (){
      let type = this.formCard.type
      if (type == 'add') {
        this.createEventt()
        this.setForm('add')
      }else if (type == 'edit') {
        this.updateEventt()
        this.setForm('add')
      }
    },
    toglleAction (section, id){
      switch (section) {
        case 'fullForm':
          this.showFullForm = !this.showFullForm
        break;
        case 'delete':
          this.eventt._id =  id
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
    getAllEventts (){
      axios.get( urlEventt ,config)
      .then(res => {
        // this.setMenssage(res)
        this.eventts = res.data.eventtsOrder;
      })
      .catch(error => {
        this.setMenssage(error)
      })
    },
    getAllPromos (){
      axios.get( urlPromo ,config)
      .then(res => {
        // this.setMenssage(res)
        this.promos = res.data.promos
      })
      .catch(error => {
        this.setMenssage(error)
      })
    },
    //EVENTT
    createEventt (e){

      let eventtPromos = this.selectPromos;
      let image = this.eventtImageSelect;
      let cover = this.eventtCoverSelect;

      let formData = new FormData();
          formData.append('_id', helpers.mongoObjectId());
          formData.append('title', this.eventt.title);
          formData.append('info', this.eventt.info);
          formData.append('shortInfo', this.eventt.shortInfo);
          formData.append('eventtImage', image, image.name);
          formData.append('eventtCover', cover, cover.name);
          formData.append('type', this.eventt.type);
          formData.append('day', this.eventt.day);
          formData.append('hour', this.eventt.hour);
          formData.append('since', this.eventt.since);
          formData.append('until', this.eventt.until);
          for (var i = 0; i < eventtPromos.length; i++) {
            formData.append('promos', eventtPromos[i]._id);
          }

          // for (var pair of formData.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]);
          // }

      axios.post(urlEventt, formData)
      .then(res =>{
        this.setMenssage(res)
        this.getAllEventts()
        this.resetEventt()
      })
    },
    getEventt (action, eventt){

      this.toglleAction(action)
      this.eventt = eventt
      this.eventt.since = eventt.validity.since
      this.eventt.until = eventt.validity.until

      this.eventtImageEdit = eventt.eventtImage
      if(eventt.eventtImage == 'delete' || this.eventtImageEdit == undefined){
        this.eventtImageEdit = '';
      }
      this.eventtCoverEdit = eventt.eventtCover
      if(eventt.eventtCover == 'delete' || this.eventtCoverEdit == undefined){
        this.eventtCoverEdit = '';
      }

      let promosEd = this.eventt.promos
      let fullPromos = this.promos;

      fullPromos = fullPromos.filter(function(el){
        return ~promosEd.indexOf(el._id)
      });
      this.selectPromos = fullPromos

      this.setForm('edit', eventt._id);
      this.getAllEventts();
      setTimeout(() => {
        // this.eventt.eventtImageEdit = ''
        // this.eventt.eventtCoverEdit = ''
        Bus.$emit('update');
      }, 10);
    },
    updateEventt (e){

      let eventtPromos = this.selectPromos;
      let image = this.eventtImageSelect;
      let cover = this.eventtCoverSelect;

      let formData = new FormData();
          formData.append('title', this.eventt.title);
          formData.append('info', this.eventt.info);
          formData.append('shortInfo', this.eventt.shortInfo);

          if(this.eventt.eventtImage == 'delete'){
            formData.append('eventtImage', 'delete')
          }else if(image){
            formData.append('eventtImage', image, image.name);
          }
          if(this.eventt.eventtCover == 'delete'){
            formData.append('eventtCover', 'delete')
          }else if(cover){
            formData.append('eventtCover', cover, cover.name);
          }
          formData.append('type', this.eventt.type);
          formData.append('day', this.eventt.day);
          formData.append('hour', this.eventt.hour);
          formData.append('since', this.eventt.since);
          formData.append('until', this.eventt.until);
          for (var i = 0; i < eventtPromos.length; i++) {
            formData.append('promos', eventtPromos[i]._id);
          }


          // for (var pair of formData.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]);
          // }

      axios.patch(`${urlEventt}/${this.eventt._id}`, formData)
      .then(res =>{
        this.setMenssage(res);
        this.getAllEventts();
        this.toglleAction('add')
        this.resetEventt();
      })
    },
    deleteEventt (e){
      axios.delete( `${urlEventt}/${e}`, config)
      .then(res =>{
        this.getAllEventts()
      })
    },
    resetEventt (){
        Bus.$emit('reset');
        this.eventtImageEdit = ''
        this.eventtCoverEdit = ''
        this.Eventt = {
          name: '',
          info: '',
          legals: `Pie legal`,
          promoImage: '', /* ARCHIVO IMAGEN PRINCIPAL */
          since: '',
          until: '',
          day: '',
          hour: '',
          promos: []
        }
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


  //EVENTTS CARDS
  .eventtsCard{
    @include flex;
    @include edContainer;
    @include blueCard;
    @include headerCard;
  }
  .eventtsContainer{
    @include flex;
    width: 100%;
    padding: 1em 0 0 0;
    border-top: 2px solid $color-fondo;
  }
  .eventtContainer{
    @include flex;
    @include  edItem(100, 50, 25, 25);
    padding: 0 0.5rem;
  }
  .eventtCard{
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
