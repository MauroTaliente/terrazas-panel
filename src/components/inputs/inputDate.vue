<template>
  <div class="item date"
      v-on:click="setDate()">
    <div class="year">
      <h4 class="label">{{ name }}</h4>
      <v-select v-model="dateCreate.year"
                :options="years">
      </v-select>
    </div>
    <div class="month">
      <h4 class="label">&nbsp;</h4>
    <v-select v-model="dateCreate.month"
              :options="months">
      </v-select>
    </div>
    <div class="day">
      <h4 class="label">&nbsp;</h4>
      <v-select v-model="dateCreate.day"
                :options="days">
      </v-select>
    </div>
    <!-- <pre><code>{{ $data }}</code></pre> -->
  </div> 
</template>

<script>

import { Bus } from '../../helpers/Bus.js'
import vSelect from 'vue-select';

export default {
  name: 'inputText',
  components:{
    vSelect
  },
  props: {
    name: '',
    oNmodel: '',
    required: {
      type: Boolean,
      },
  },
  data (){
    return{
      date: '',
      years: ['2018','2019','2020','2021','2022'],
      months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      days: ['01','02','03','04','05','06','07','08','09','10',
             '11','12','13','14','15','16','17','18','19','20',
             '21','22','23','24','25','26','27','28','29','30','31'],
      dateCreate:{
        year: '2018',
        month: '01',
        day: '01',
      }
    }
  },
  methods: {
    setDate (){
      let year = this.dateCreate.year
      let month = this.dateCreate.month
      let day = this.dateCreate.day
      let dateIn = `${year}-${month}-${day}`
      this.date = `${dateIn} 00:01`
      this.updateInput()
    },
    updateInput() {
      this.$emit('input', this.date);
    },
    reset() {
      this.date = '';
      this.dateCreate = { year: '2018', month: '01', day: '01'}
    },
    update() { 
      this.date = this.$props.oNmodel
      let small = this.date.substr(0,10)
      let parts = small.split('-')
      
      this.dateCreate.year = parts[0]
      this.dateCreate.month = parts[1]
      this.dateCreate.day = parts[2]
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

  .v-select{
    .dropdown-toggle{
      box-sizing: border-box;
      padding: 0 0 4px 0;
      height: 30px;
    }
    .selected-tag{
      margin: 4px 4px 0 0;
    }
  }
      .v-select-multiple{
      padding: 0 0 4px 4px !important;
    }
  .date{
    position: relative;
    justify-content: space-between;
    .v-select{
      width: 100%;
      position: relative;
      background-color:$color-1;
      border-radius: 4px;
      height: 2rem;
      .selected-tag{
        position: relative;
        text-align: center;
        padding-left: 0.5em;
        font-size: 0.8em;
        font-weight: 200;
        padding: 0 3px;
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
    .form-control{
      font-size: 0.8em;
      font-weight: 100;
      text-align: center;
      padding: 0px 14px 0px 0px;
    }
    .selected-tag{
      position: absolute;
    }
    .year{
      display: flex;
      flex-wrap: wrap;
      width: 34%;
    }
    .month{
      display: flex;
      flex-wrap: wrap;
      width: 30%;
    }
    .day{
      display: flex;
      flex-wrap: wrap;
      width: 30%;
    }
  }


</style>

