<template>
  <router-view>
    <Login></Login>
  </router-view>
</template>

<script>

export default {
  name: 'app',
  // data () {
  //   return {
  //     msg: 'Welcome Mauro to Vue.js App'
  //   }
  // }
}
</script>

<style lang="scss">

@import '~globscss/components/base';
@import '~globscss/mi-grid.scss';
@import "~globscss/main.scss";
@import '~globscss/components/core';
@import '~globscss/components/media-queries';
@import '~globscss/components/flexbox';

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v38/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  // -webkit-font-feature-settings: 'liga';
   -webkit-font-smoothing: antialiased;
}

*{
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

i{
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}

body{
  box-sizing: border-box;
  margin: 0;
}
img{
  display: block;
  max-width: 100%;
}
h1,h2,h3,h4,h5,p,span{
  font-family: $font-1;
  letter-spacing: 0.075em;
  margin: 0;
}
.show {
  display: initial;
  transition: 0.2s ease all;
}
.none{
  display: none;
  transition: 0.2s ease all;
}

.full{
  @include flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

  .loading{
    @include flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 20;
    top: 0;
    right: 0;
    background-color:rgba($color-3, 0.8);
    width: 100%;
    height: 100%;
    img{
      display: block;
      width: 8rem;
      height: 8rem;
    }
  }

//CARDS
.header{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  legend{
    padding: 1.5em 0;
    color: $color-5;
    font-size: 1em;
    font-weight: 200;
    letter-spacing: 0.1em;
    padding-bottom: 1em;
  }
  .left{
    position: absolute;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    align-self: flex-end;
  }
  .windowComander{
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    font-size: 1em;
    padding: 1.2em 1em 0.8em 1em;
    &:hover{
      color: $color-4;
      i{
        text-shadow: 0 2px 10px $color-3;
      }
    }
  }
}


.content{
    @include flex;
    @include edContainer;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
  }

.monoItem{
  @include edContainer;
  @include monoItem;
}

.col{
    @include flex;
    width: 100%;
    flex-direction: row;
  }
  .row{
    padding: 0;
    margin: 0;
    @include flex;
    @include edItem(100, 50, 25, 25);
    flex-direction: column;
  }
  .l33{
    margin-top: -0.5rem;
    @include edItem(100,50,33.33,33.33);
    @include fromTo(s,l){
    margin-top: 0;
    }
  }
  .l25{
    margin-top: -0.5rem;
    flex-direction: row;
    align-items: flex-start;
    @include edItem(100,50,25,25);
    @include fromTo(s,l){
    margin-top: 0;
    }
  }
  .l75{
    margin-top: -0.5rem;
    flex-direction: row;
    align-items: flex-start;
    @include edItem(100,50,75,75);
    @include fromTo(s,l){
    margin-top: 0;
    }
  }
  .a50{
    display: flex;
    @include edItem(50)
  }
  .item {
    @include flex;
    @include edItem(100);
    position: relative;
    padding: 0.5rem;
    margin: 0;
    transition: 0.2s ease all;
  }
  .item70{
    @include edItem(100,100,60,70);
  }
  .item50{
    @include edItem(100,50,50,50);
  }
  .item30{
    @include edItem(100,100,40,30);
  }
  .item33{
    @include edItem(100,50,33.33,33.33);
  }

.inVue{
  .fade-enter-active, .fade-leave-active {
    position: relative;
    transition: all 0.2s;
  }
  .fade-enter, .fade-leave-to{
    position: absolute;
    transition: opacity 1;
  }
    /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(200px);
    opacity: 0;
  }
}

.container{
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: $color-fondo;
}

.btn{
  @include btn;
}

.btnImportant{
  @include flex;
  @include btnImportant
}

.btnRed, .btnEliminar{
  @include btnRed;
}
.btnGreen, .btnAgregar{
  @include btnGreen;
}

  .text{
    p , h1 , h2 , h3 , h4 , h5 {
      width: 100%;
      display: block;
    }
  }

//QUITA EL BORDE DE LOS BUTTON
a:focus,
button:focus,
input:focus,
textarea:focus {
outline: none;
}
button{
  cursor: pointer;
}

</style>
