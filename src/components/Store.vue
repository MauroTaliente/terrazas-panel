<template>
  <div class="inVue">
    <div class="content">

      <!-- Area de mensajes -->
      <div class="messageArea">
        <transition name="fade">
          <p class="message errMessage" v-if="errorMenssage"> {{ errorMenssage }}</p>
          <p class="message okMessage" v-if="successMenssage"> {{ successMenssage }} </p>
        </transition>
      </div>

      <!-- Crear y Editar category -->
      <div class="createCategory">
          <section id="formCat"
            class="actionWindow">
            <superForm2
              v-on:emitEvent="categoryControl"
              :name="formCardCat.name"
              :type="formCardCat.type"
              :swich="showFullFormCat"
              :noneLaunch="editMode">
              <section class="content"
                      v-show="showFullFormCat">
                <div class="row item50">
                  <inputText
                    name='Nombre'
                    required
                    :oNmodel="category.name"
                    v-model="category.name"
                    v-on:input="categoryControl('new')">
                  </inputText>
                  <inputText
                    name='Descripcion'
                    :oNmodel="category.info"
                    v-model="category.info">
                  </inputText>
                    <inputBoolean
                      name="Estado"
                      :oNmodel="category.state"
                      v-model="category.state"
                      :state="category.state"
                      textOn="Categoria Activa"
                      textOff="Categoria Inactiva">
                    </inputBoolean>
                </div>
                <div class="row item50">
                  <inputImage
                    name="Imagen de la categoria"
                    :editImage="editImageCat"
                    v-model="selectImageCat">
                  </inputImage>
                </div>
                <div class="loading"
                v-if="loading">
                  <img src="/dist/loadSolo.svg" alt="">
                </div>
              </section>
            </superForm2>
          </section>
      </div>

      <!-- Ver las categorys -->
      <div class="viewCategorys"
        :class="displayEditModeB"
        v-if="!editMode">
        <div class="categorysCard">
          <div class="header">
            <h2>Categorias</h2>
          </div>
          <div class="content"
            v-show="showFullFormCat">
            <displayList
              v-on:emitEvent="categoryControl"
              :items="categorys"
              controls>
            </displayList>
          </div>
        </div>
      </div>

      <!-- Crear y Editar store -->
      <div class="createStore"
           v-show="!editMode">
          <section id="form"
            class="actionWindow">
            <superForm2
              v-on:emitEvent="storeControl"
              :name="formCard.name"
              :type="formCard.type"
              :swich="showFullForm">
              <section class="content"
                      v-show="showFullForm">
                <div class="row">
                  <div class="col">
                    <inputText
                      class="item70"
                      name='Nombre'
                      required
                      :oNmodel="store.name"
                      v-model="store.name">
                    </inputText>
                    <inputText
                      class="item30"
                      name='Numero'
                      type="number"
                      required
                      :oNmodel="store.nStore"
                      v-model="store.nStore">
                    </inputText>
                  </div>
                  <inputEditor name='Descripción'
                              :oNmodel="store.info"
                              v-model="store.info">
                  </inputEditor>
                </div>
                <div class="row">
                    <div class="col">
                      <inputSelect
                        class="item50"
                        name="Planta"
                        :oNmodel="store.floor"
                        v-model="store.floor"
                        :options="floor">
                      </inputSelect>
                      <inputSelect
                        class="item50"
                        name="Tipo"
                        :oNmodel="store.type"
                        v-model="store.type"
                        :options="types">
                      </inputSelect>
                    </div>
                    <inputSelect
                      name="Categorias"
                      :oNmodel="selectCategorys"
                      v-model="selectCategorys"
                      :options="categorys"
                      label="name"
                      multiple>
                    </inputSelect>
                </div>
                <div class="row">
                  <inputImage
                    name="logo del local"
                    :editImage="editImage"
                    v-model="selectImage">
                  </inputImage>
                </div>
                <div class="row">
                    <inputText
                      name='Sitio web'
                      :oNmodel="store.web"
                      v-model="store.web">
                    </inputText>
                    <inputText
                      name='Telefono'
                      :oNmodel="store.tel"
                      v-model="store.tel">
                    </inputText>
                    <inputBoolean
                      name="Estado"
                      :oNmodel="store.state"
                      v-model="store.state"
                      :state="store.state"
                      textOn="Local Activo"
                      textOff="Local Inactivo">
                    </inputBoolean>
                </div>
                <div class="loading"
                v-if="loading">
                  <img src="/dist/loadSolo.svg" alt="">
                </div>
              </section>
            </superForm2>
          </section>
      </div>

      <!-- Ver todos los locales -->
      <div :class="['viewAllStores', viewAllStoresEm]">
        <div class="storesCard allStores">
          <div class="header">
            <h2>Locales</h2>
            <div class="left">
              <inputText
                class="search"
                place='Buscar Local'
                :oNmodel="search"
                v-model="search">
              </inputText>
              <span class="windowComander"
                v-on:click="toglleAction('list')"
                v-if="!editMode">
                <i class="material-icons"
                  v-if="!cardList">
                  view_list
                </i>
                <i class="material-icons"
                  v-if="cardList">
                  view_module
                </i>
              </span>
            </div>
          </div>
          <div class="content">
            <displayCardList
              v-on:emitEvent="storeControl"
              :items="filterStores"
              :url="this.url"
              :cardList="this.cardList"
              :editMode="editMode"
              imageKey='store.logo'
              controls>
            </displayCardList>
          </div>
          <div class="launchArea">
             <div class="data">
              <p v-if="!editMode">
                {{displayStores.length}} / {{stores.length}} Locales
              </p>
              <p v-if="editMode">
                {{stores.length}} Locales
              </p>
            </div>
            <div class="controls"
                 v-if="!editMode">
              <span class="btn"
                v-on:click="storeControl('progresive')"
                v-if="stores.length !== displayStores.length && !this.cardList">
                Ver mas <i class="material-icons">keyboard_arrow_down</i>
              </span>
              <span class="btn"
                v-on:click="storeControl('viewAll')"
                v-if="stores.length !== displayStores.length && this.cardList">
                Ver Todos <i class="material-icons">keyboard_arrow_down</i>
              </span>
              <span class="btn"
                v-on:click="storeControl('viewLess')"
                v-if="stores.length == displayStores.length">
                Ver menos <i class="material-icons">keyboard_arrow_up</i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- locales seleccionados para esta categoria -->
      <div :class="['viewInStores', viewAllStoresEm]"
         v-if="editMode">
        <div class="storesCard inStores">
          <div class="header">
            <h2>Locales en: {{ category.name }}</h2>
          </div>
          <div class="content"
            v-show="showFullFormCat">
            <displayCardList
              v-model="selectStores"
              :items="selectStores"
              v-on:emitEvent="categoryControl"
              :url="this.url"
              cardList
              more
              :editMode="editMode">
            </displayCardList>
          </div>
          <div class="launchArea"
                v-if="editMode">
            <span class="btnImportant"
                  v-on:click="categoryControl('send')">
              <i class="material-icons">launch</i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Elimiar store -->
    <transition name="fade" mode="out-in">
      <alert
        :class="[displayDeleteAction]"
        v-if="showDelete"
        acpText="Eliminar"
        canText="Cancelar"
        v-on:can="toglleAction('delete')"
        v-on:acp="deleteStore"
        name="Eliminar"
        text="Estas seguro deseas eliminar este Local?"
        :elId="store._id">
      </alert>
    </transition>
    <!-- Elimiar Categorys -->
    <transition name="fade" mode="out-in">
      <alert
        :class="[displayDeleteActionB]"
        v-if="showDeleteB"
        acpText="Eliminar"
        canText="Cancelar"
        v-on:can="toglleAction('deleteCat')"
        v-on:acp="deleteCategory"
        name="Eliminar"
        text="Estas seguro deseas eliminar esta Galeria?"
        :elId="category._id">
      </alert>
    </transition>

     <div class="debug">
      <!-- <pre><code>{{ $data.selectStores }}</code></pre>
      <br> -->
      <pre><code>STORES SELECT{{ $data.selectStores }}</code></pre>
      <br>
      <pre><code>STORES DISCAR{{ $data.discardStores }}</code></pre>
    </div>

  </div>
</template>

<script>

import helpers from '../helpers'
import axios from 'axios';

import moment,{ locale } from 'moment';
import { Bus } from '../helpers/Bus.js'
// import { scroller } from 'vue-scrollto/src/scrollTo';

import superForm2 from './superForm2'
import inputText from './inputs/inputText'
import inputEditor from './inputs/inputEditor'
import inputImage from './inputs/inputImage'
import inputDate from './inputs/inputDate'
import inputSelect from './inputs/inputSelect'
import inputTextArea from './inputs/inputTextArea'
import inputBoolean from './inputs/inputBoolean'

import displayList from './display/displayList'
import displayCardList from './display/displayCardList'

import Alert from './alerts/Alert'

const urlStore = `${helpers.api}store`;
const urlCategorySimple = `${helpers.api}category/simple`;
const urlCategory = `${helpers.api}category`;
const config = { headers: { authorization: 'Bearer ' + localStorage.token,
                            'Content-Type': 'multipart/form-data' }};
// const ScrollToSuperAdd = scroller();


export default {
  name: 'Store',
  components: {
    superForm2,
    inputText,
    inputEditor,
    inputImage,
    inputDate,
    inputSelect,
    inputTextArea,
    inputBoolean,
    displayList,
    displayCardList,
    Alert
  },
  data () {
    return {
      url: helpers.url,
      formCard: {
        name:  'Nuevo Local',
        type: 'add'
      },
      formCardCat: {
        name:  'Nueva Categoria',
        type: 'addCat'
      },
      loading: false,
      editMode: false,
      editModePre: false,
      showFullForm: false,
      showFullFormCat: true,
      cardList: true,
      showDelete: false,
      showDeleteB: false,
      errorMenssage: '',
      successMenssage: '',
      uploadMessage: '',
      floor: ['Planta baja','Primer piso'],
      types: ['Local','Stand'],
      editImage: '',
      selectImage: '',
      selectCategorys: [],
      editImageCat: '',
      selectImageCat: '',
      stores: [/* STORES */],
      selectStores: [],
      discardStores: [],
      displayStores: [],
      store:{
        _id: '',
        nStore: '',
        floor: '',
        name: '',
        info: '',
        web: '',
        tel: '',
        type: '',
        logo: '', /* ARCHIVO IMAGEN PRINCIPAL */
        state: true,
        category: [],
        add: false
      },
      category:{
        _id: '',
        name: '',
        info: '',
        categoryImage: '', /* ARCHIVO IMAGEN PRINCIPAL */
        state: true,
        stores: []
      },
      search: '',
      categorys: [/* CATEGORYS */]
    };
  },
  mounted (){
    this.getAllStores();
    this.getAllCategorys();
  },
  computed:{
    showCardList (){
      return (this.cardList)? 'cardListOn' : ''
    },
    displayDeleteAction (){
      return (this.showDelete)? 'showWow' : ''
    },
    displayDeleteActionB (){
      return (this.showDeleteB)? 'showWow' : ''
    },
    viewAllStoresEm (){
      return (this.editMode)? 'viewAllStoresEm' : ''
    },
    displayEditModeB (){
      return (this.editMode)? 'none' : ''
    },
    displayEditModeC (){
      return (this.editModePre)? 'anima' : ''
    },
    filterStores (){
      return this.displayStores.filter((store) => {
        return store.name.match(this.search);
      })
    }
  },
  methods:{
    toglleAction (section, id){

      switch (section) {
        case 'fullForm':
          this.showFullForm = !this.showFullForm
        break;
        case 'fullFormCat':
          this.showFullFormCat = !this.showFullFormCat
        break;
        case 'delete':
          this.store._id =  id
          this.showDelete = !this.showDelete
        break;
        case 'delete':
          this.store._id =  id
          this.showDelete = !this.showDelete
        break;
        case 'deleteCat':
          this.category._id =  id
          this.showDeleteB = !this.showDeleteB
        break;
        case 'list':
          this.cardList = !this.cardList
        break;
      }
    },
    transitonAction (){ //sin usar
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
    setForm (action, id){

      switch (action) {
        case 'add':
          this.formCard = {
            name: 'Nuevo Local',
            type: 'add'
          }
          this.resetStore();
        break;
        case 'edit':
          this.formCard = {
            name: 'Editando Local',
            type: 'edit'
          }
        break;
        case 'addCat':
          this.formCardCat = {
            name: 'Nueva Categoria',
            type: 'addCat'
          }
          this.resetCategory();
          this.displayStores = this.stores
          this.editMode = false;
          break;
        case 'editCat':
          this.formCardCat = {
            name: 'Editando Categoria',
            type: 'editCat'
          }
        break;
      }
    },
    sendForm (type){
      if (type == 'add') {
        this.createStore()
      }else if (type == 'edit') {
        this.updateStore()
        this.setForm('add')
      }else if (type == 'addCat') {
        this.createCategory()
        this.getAllStores()
      }else if (type == 'editCat') {
        this.updateCategory()
        this.setForm('addCat')
        this.getAllStores()
        this.editMode = false;
      }
    },
    // TRAEN LA DATA DE LA API
    getAllCategorys (){
      axios.get( urlCategory ,config)
      .then(res => {
        // this.setMenssage(res)
        this.categorys = res.data.categorysOrder;
      })
      .catch(error => {
        this.setMenssage(error)
      })
    },
    getAllStores (){
      axios.get( urlStore ,config)
      .then(res => {
        // this.setMenssage(res)
        let stores = res.data.storesOrder
        this.stores = stores
        this.selectStores = []
        this.discardStores = []
        this.storesProgresive(stores, 4)
      })
      .catch(error => {
        this.setMenssage(error)
      })
    },
    //STORE
    storesProgresive (items, n){
      let fullStores = items;
      let selectStores = this.selectStores;
      let discardStores = [];
      let resto = fullStores.length - n

      for (let i = 0; i < fullStores.length; i++) {
        discardStores.push(fullStores[i]);
      }

      if (discardStores.length >= n) {
        for (let i = 0; i < n; i++) {
          selectStores.push(discardStores[i]);
        }
        discardStores = discardStores.splice(n, resto);
        console.log(discardStores);
      }else{
        let resto = discardStores.length
        for (let i = 0; i < resto; i++) {
          selectStores.push(discardStores[i]);
        }
        discardStores = [];
      }

      this.selectStores = selectStores
      this.discardStores = discardStores
      this.displayStores = selectStores;
    },
    createStore (e){
      this.loading = true
      let storeCategory = this.selectCategorys;
      let image = this.selectImage

      let formData = new FormData();
          formData.append('_id', helpers.mongoObjectId())
          formData.append('nStore', this.store.nStore);
          formData.append('name', this.store.name);
          formData.append('info', this.store.info);
          formData.append('web', this.store.web);
          formData.append('tel', this.store.tel);
          formData.append('floor', this.store.floor);
          formData.append('type', this.store.type);
          formData.append('state', this.store.state);
          formData.append('logo', image, image.name);
          for (var i = 0; i < storeCategory.length; i++) {
            formData.append('category', storeCategory[i]._id);
          }

          // for (var pair of formData.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]);
          // }

      axios.post(urlStore, formData)
      .then(res =>{
        this.loading = false
        this.setMenssage(res)
        this.getAllStores()
        this.resetStore()
      })
    },
    getStore (action, store){

      this.store = store

      if(store.logo == 'delete'){
        this.editImage = '';
      }
      this.editImage = store.logo

      let storesEd = this.store.category
      let fullCategorys = this.categorys;
      let selectCategorys = fullCategorys.filter(function(el){
          return ~storesEd.indexOf(el._id)
      });
      this.selectCategorys = selectCategorys
      this.setForm('edit', store._id);
      setTimeout(() => {
        Bus.$emit('update');
      }, 100);
    },
    updateStore (e){
      this.loading = true
      let storeCategory = this.selectCategorys;
      let image = this.selectImage

      let formData = new FormData();
          formData.append('nStore', this.store.nStore);
          formData.append('name', this.store.name);
          formData.append('info', this.store.info);
          formData.append('web', this.store.web);
          formData.append('tel', this.store.tel);
          formData.append('floor', this.store.floor);
          formData.append('type', this.store.type);
          formData.append('state', this.store.state);
          for (var i = 0; i < storeCategory.length; i++) {
            formData.append('category', storeCategory[i]._id);
          }

          if(this.store.logo == 'delete'){
            formData.append('logo', 'delete')
          }else if(image){
            formData.append('logo', image, image.name);
          }

          // for (var pair of formData.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]);
          // }

      axios.patch(`${urlStore}/${this.store._id}`, formData)
      .then(res =>{
        this.loading = false
        this.setMenssage(res);
        this.getAllStores();
        this.resetStore();
        this.toglleAction('add')
      })
    },
    deleteStore (e){
      axios.delete( `${urlStore}/${e}`, config)
      .then(res =>{
        this.getAllStores()
      })
    },
    resetStore (e){
      this.editImage = ''
      this.store = {
        _id: '',
        nStore: '',
        floor: '',
        name: '',
        info: '',
        web: '',
        tel: '',
        type: '',
        logo: '',
        state: true,
        category: ''
      }
      this.editImage = '';
      this.selectImage = '';
      this.selectCategorys = [];

      setTimeout(() => {
        Bus.$emit('update');
      }, 150);
    },
    storeControl (action, el){
      // console.log(action);
      switch (action) {
        case 'toggle':
          this.toglleAction('fullForm')
          if (this.showFullFormCat) {
            this.toglleAction('fullFormCat')
            this.resetCategory()
          }
        break;
        case 'reset':
          this.resetStore()
        break;
        case 'close':
          this.setForm('add')
          this.toglleAction('fullForm')
        break;
        case 'send':
          this.sendForm(this.formCard.type)
        break;
        case 'edit':
          this.getStore('edit',el)
          if (!this.showFullForm) {
            this.toglleAction('fullForm')
          }
        break;
        case 'delete':
          this.toglleAction('delete',el)
        break;
        case 'remove':
          this.removeStore(el)
        break;
        case 'add':
        this.addStore(el)
        break;
        case 'progresive':
          this.storesProgresive(this.discardStores, 4)
        break;
        case 'viewAll':
          this.displayStores = this.stores
        break;
        case 'viewLess':
          let reset = []
          for (let i = 0; i < 4; i++) {
            reset.push(this.stores[i])
          }
          this.displayStores = reset
        break;
      }
    },
    //CATEGORY
    createCategory (e){
      this.loading = true
      let image = this.selectImageCat
      let categoryStores = this.selectStores

      let formData2 = new FormData();
          formData2.append('_id', helpers.mongoObjectId())
          formData2.append('name', this.category.name);
          formData2.append('info', this.category.info);
          formData2.append('state', this.category.state);
          formData2.append('categoryImage', image, image.name);

          for (var i = 0; i < categoryStores.length; i++) {
            formData2.append('stores', categoryStores[i]._id);
          }

          // for (var pair of formData2.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]);
          // }

      axios.post(urlCategory, formData2)
      .then(res =>{
        this.loading = false
        this.setMenssage(res)
        this.getAllCategorys()
        this.resetCategory()
      })
    },
    resetCategory (e){
      this.editImageCat = ''
      this.category = {
        _id: '',
        name: '',
        info: '',
        categoryImage: '',
        state: true,
        stores: ''
      }
      this.editImageCat = '';
      this.selectImageCat = '';
      this.selectStores = [];
      this.storesProgresive(this.stores, 4)
      this.editMode = false;
      setTimeout(() => {
        Bus.$emit('update');
      }, 150);
    },
    getCategory (category){
      this.category = category

      if(category.categoryImage == 'delete'){
        this.editImageCat = '';
      }
      this.editImageCat = category.categoryImage

      let storesEd = this.category.stores
      let fullStores = this.stores;
      let selectStores = fullStores.filter(function(el){
          return ~storesEd.indexOf(el._id)
      });
      this.selectStores = selectStores

      this.setForm('editCat', category._id);
      this.getAllCategorys();
      setTimeout(() => {
        Bus.$emit('update');
      }, 10);
    },
    updateCategory (e){
      this.loading = true
      let image = this.selectImageCat
      let categoryStores = this.selectStores

      let formData2 = new FormData();
          formData2.append('name', this.category.name);
          formData2.append('info', this.category.info);
          formData2.append('state', this.category.state);
          if (categoryStores !== []) {
            for (var i = 0; i < categoryStores.length; i++) {
              formData2.append('stores', categoryStores[i]._id);
            }
          }
          if(this.category.categoryImage == 'delete'){
            formData2.append('categoryImage', 'delete')
          }else if(image){
            formData2.append('categoryImage', image, image.name);
          }

          for (var pair of formData2.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
          }

      axios.patch(`${urlCategory}/${this.category._id}`, formData2)
      .then(res =>{
        this.loading = false
        this.setMenssage(res);
        this.resetCategory();
        this.getAllCategorys();
        //reset displayStores
        this.displayStores = this.stores
      })
    },
    deleteCategory (e){
      axios.delete( `${urlCategory}/${e}`, config)
      .then(res =>{
        this.getAllCategorys()
      })
    },
    categoryControl (action, el){
      switch (action) {
        case 'toggle':
          this.toglleAction('fullFormCat')
          if (this.showFullForm) {
            this.toglleAction('fullForm')
             this.resetStore()
          }
        break;
        case 'reset':
          this.resetCategory()
        break;
        case 'close':
          this.setForm('addCat')
        break;
        case 'send':
          this.sendForm(this.formCardCat.type)
        break;
        case 'new':
          if (!this.editMode) {
            this.selectStores = [];
            this.superAdd()
          }
        break;
        case 'edit':
          this.setForm('editCat')
          this.getCategory(el)
          this.superAdd()
        break;
        case 'delete':
          this.toglleAction('deleteCat',el)
        break;
        case 'remove':
          this.removeStore(el)
        break;
      }
    },
    superAdd() {

      // ScrollToSuperAdd('#locals')
      this.editMode = true

      if (this.cardList == false) {
        this.toglleAction('list')
      }


      let fullStores = this.stores // total disponible
      let discardStores = [] //descarte
      let selectStores = this.category.stores //son solo refenrencias por id

      //Primero utilizo el arrey de ids de la category
      //para sumarlos a un arrey de descarte #discardStores
      discardStores = fullStores.filter(function(el) {
        return selectStores.indexOf(el._id) === -1;
      });

      //Obtiene los Stores seleccionados completos #selectStores
      selectStores = fullStores.filter(function(el){
        return ~selectStores.indexOf(el._id)
      });

      //Igualo la lista principal de Stores a los descartados
      this.displayStores = discardStores
      this.discardStores = discardStores
    },
    addStore(store) {

      let fullStores = this.stores // total disponible
      let selectStores = this.selectStores // seleccionados
      let discardStores = this.discardStores // descarte

      // get index of object with store ID
      let removeIndex = discardStores.map(function(item) {
         return item._id;
      }).indexOf(store._id);
      // remove object in collection
      discardStores.splice(removeIndex, 1);
      this.displayStores = discardStores
      //agrego el #store a los seleccionados
      selectStores.push(store)
      this.selectStores = selectStores
    },
    removeStore(store) {
      let fullStores = this.stores // total disponible
      let selectStores = this.selectStores // seleccionados
      let discardStores = this.discardStores // descarte

        // get index of object with store ID
      let removeIndex = selectStores.map(function(item) {
          return item._id;
      }).indexOf(store._id);
      // remove object in collection
      selectStores.splice(removeIndex, 1);

      this.selectStores = selectStores
      discardStores.push(store)
      this.discardStores = discardStores
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

  .createCategory{
    @include flex;
    @include edItem(100,100,50);
    position: relative;
    padding: 0 0.5rem;
    transition: 0.2s ease all;
  }

  .viewCategorys{
    @include flex;
    @include edItem(100,100,50);
    position: relative;
    padding: 0 0.5rem;
    transition: 0.2s ease all;
    .categorysCard .content{
      height: 284px;
      margin-bottom: 1rem;
      overflow-y: scroll;
    }
  }

  .createStore{
    @include flex;
    @include edItem(100);
    padding: 0 0.5rem;
  }

  .viewAllStores,
  .viewInStores{
    @include flex;
    @include edItem(100);
    position: relative;
    padding: 0 0.5rem;
  }

  .allStores{
    .content{
      max-height: 80vh;
      overflow-y: scroll;
      @include fromTo(s,l){
        max-height: 45vh;
      }
    }
  }

  .viewAllStoresEm{
   @include edItem(100,100,50);
   .allStores{
     width: calc( 100% - 1rem );
     position: absolute;
     @include fromTo(s,l){
       width: 100%;
       position: relative;
     }
     .content{
       max-height: 80vh;
       overflow-y: scroll;
       @include fromTo(s,l){
         max-height: 45vh;
       }
     }
   }
   .inStores{
     .content{
      max-height: calc( 82vh - 370px );
      overflow-y: scroll;
      @include fromTo(s,l){
         max-height: 45vh;
       }
     }
   }
  }

  //category CARD
  .categorysCard{
    @include flex;
    @include blueCard;
    flex-direction: column;
    .header,.footer{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      width: 100%;
      position: relative;
      h2{
        padding: 1.5em 0.5em 1em 1em;
        color: $color-5;
        font-size: 1em;
        font-weight: 200;
        letter-spacing: 0.1em;
        padding-bottom: 1em;
      }
    }
    .footer{
      border-top: 2px solid $color-fondo;
    }
    .content{
      @include flex;
      @include edContainer;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      padding: 0.5em;
      border-top: 2px solid $color-fondo;
      width: 100%;
    }
  }

  //stores CARD
  .storesCard{
    @include flex;
    @include edContainer;
    @include blueCard;
    @include headerCard;
    flex-direction: column;
    .content {
    padding: 0.5em 0;
    border-top: 2px solid $color-fondo;
    }
    .left{
      @include flex;
      justify-content: flex-end;
      position: absolute;
      width: 300px;
      right: 0rem;
      top: 0;
      .search{
        align-self: flex-start;
        padding: 0;
        margin-right: 0.5rem;
        width: calc( 100% - 4rem );
        input{
          margin: 1rem 0 0 0;
          align-self: flex-end;
        }
      }
    }
  }

  .launchArea{
    @include flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 0;
    width: 100%;
    border-top: 2px solid $color-fondo;
    .btnImportant{
      width: 100%;
      justify-content: center;
      align-items: center;
      margin: 0.5rem 0;
      padding: 0.25em;
    }
    .controls{
      @include flex;
      .btn{
        @include flex;
        align-items: center;
        color: $color-5;
        border: 2px solid $color-fondo;
        padding: 0.25em 0.5em 0.25em 1em;
        margin: 0.5rem 0.5rem 0.5rem 0;
        &:hover{
        background-color: $color-6;
        color: $color-4;
        border-color: $color-6;
        }
      }
    }
    .data{
      @include flex;
      align-items: center;
      padding-right: 0.5rem;
      p{
        font-weight: 200;
        font-size: 0.9rem;
        letter-spacing: 0.05rem;
        padding: 1rem;
      }
    }
  }

  .btnAdminStore{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    i{
      padding: 0 0.5rem;
    }
  }
  .storesEditArea{
    @include flex;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
  }

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


  //ON-OFF
  .on{
    color: $color-ok !important;
  }
  .off{
    color: $color-err !important;
  }


</style>
