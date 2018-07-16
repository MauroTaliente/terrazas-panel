<template>
  <div>
    <SubMenu>
      <span @click="getSection('5b4768ad3c821a08c7654583')">
        <i class="material-icons">home</i>
      </span>
      <span @click="getSection('5b4468211da78c282db14370')">
        <i class="material-icons">flag</i>
      </span>
      <span @click="getSection('5b4468211da78c282db14372')">
        <i class="material-icons">event_seat</i>
      </span>
      <span @click="getSection('5b4468211da78c282db14376')">
        <i class="material-icons">event</i>
      </span>
      <span @click="getSection('5b4468211da78c282db14374')">
        <i class="material-icons">credit_card</i>
      </span>
      <span @click="getSection('5b4468211da78c282db14373')">
        <i class="material-icons">store_mall_directory</i>
      </span>
      <span @click="getSection('5b4468211da78c282db14371')">
        <i class="material-icons">fastfood</i>
      </span>
      <span @click="getSection('5b4468211da78c282db14375')">
        <i class="material-icons">email</i>
      </span>
    </SubMenu>
    <div class="content allSections">
         <!-- Editar Sections -->
      <div class="editSection">
          <section id="form"
            class="actionWindow">
            <superForm2
              v-on:emitEvent="sectionControl"
              :name="section.name"
              type="edit"
              :swich="showFullForm"
              :editMode="editMode"
              winNone>
              <section
                class="content"
                v-show="showFullForm">
                <inputImage 
                  name="Imagen de la seccion"
                  :editImage="editImage"
                  v-model="selectImage">
                </inputImage>
                <inputEditor
                  name='Descripcion'
                  :oNmodel="section.info"
                  v-model="section.info">
                </inputEditor> 
              </section>
              <section 
                class="content"
                v-if="!showFullForm && section.sectionImage">
                  <div class="item">
                    <div class="image">
                      <img :src="url+section.sectionImage" alt="">
                    </div>
                    <div class="text"
                        v-html="section.info">
                    </div>
                  </div>
              </section>
            </superForm2>
          </section>
      </div>
    </div>
     <!-- <pre><code>{{$data}}</code></pre> -->
  </div>
</template>

<script>

import helpers from '../helpers'
import axios from 'axios'
import { Bus } from '../helpers/Bus.js'

import SubMenu from './SubMenu'
import superForm2 from './superForm2'
import inputText from './inputs/inputText'
import inputEditor from './inputs/inputEditor'
import inputImage from './inputs/inputImage'
import inputBoolean from './inputs/inputBoolean'

const url = helpers.url;
const urlSection = `${helpers.api}section`;
const config = { headers: { authorization: 'Bearer ' + localStorage.token,
                            'Content-Type': 'multipart/form-data' }};

export default {
  name: 'Dashboard',
  components:{
    SubMenu,
    superForm2,
    inputText,
    inputEditor,
    inputImage,
    inputBoolean
  },
  data (){
    return{
      url: url,
      formCard:{
        name: 'Categoria',
        type: '',
      },
      section:{
        _id: '',
        name: 'Gastronomia',
        img: '',
        info: '',
      },
      sections: [],
      editMode: false,
      selectImage: '',
      editImage: '',
      showFullForm: false,
    }
  },
  mounted (){
    this.getAllSections();
  },
  created() {
    this.$on('loaded',()=>{
      this.getSection('5b4468211da78c282db14370')
    })
  },
  methods:{
    sectionControl (action){
      this.showFullForm = !this.showFullForm
      switch (action) {
        case 'send':
          this.updateSection();
        break;
      }
    },
    getAllSections (){
      axios.get( urlSection ,config)   
      .then(res => {
        // this.setMenssage(res)
        this.sections = res.data.sectionsOrder
        this.$emit('loaded')  
      })
      .catch(error => {
        this.setMenssage(error)
      })
    },
    getSection(sectionId){
      let allSections = this.sections
      let section = allSections.find(function(el) {
        return el._id == sectionId;
      });
      if(section.sectionImage == 'delete'){
        this.editImage = '';
      }else{
        this.editImage = section.sectionImage        
      }

      this.section = section
      setTimeout(() => {
        Bus.$emit('update');     
      }, 10);
    },
    updateSection (){

      let image = this.selectImage
    
      let formData = new FormData();
          formData.append('_id', this.section._id);
          formData.append('name', this.section.name);
          formData.append('info', this.section.info);
          if (image) {
            formData.append('sectionImage', image, image.name);  
          }else if(this.section.sectionImage == 'delete'){
            formData.append('sectionImage', 'delete')
          }

      axios.patch(`${urlSection}/${this.section._id}`, formData)
      .then(res =>{
        this.getAllSections();
        this.resetSection();
      })
    },
    deleteSection (e){ 
      axios.delete( `${urlsection}/${e}`, config)
      .then(res =>{
        this.getAllSections()
      })
    },
    resetSection (){
      this.editImage = ''
      this.section = {
         _id: '',
        name: '',
        info: '',
      }
      Bus.$emit('reset');
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '~globscss/components/flexbox';
  @import "~globscss/mi-grid.scss";
  @import "~globscss/main.scss";

  .editSection{
    width: 100%;
  }
  .allSections{
    margin-top: 4rem;
  }
  .image{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 0.2rem;
    height: 11.6em;
    overflow: hidden;
    background-color: $color-fondo;
  }
  .text{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center; 
    padding: 2rem;
    margin-top: 0.5rem;
    border-radius: 0.2rem;
    background-color: $color-6;
  }
</style>
