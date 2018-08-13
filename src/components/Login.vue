<template>
  <div>
    <div class="container">
      <div class="log">
        <div class="log-header">
          <div class="log-item">
            <img src="~img/mauro.svg" alt="Mauro esta probando Vue.">
          </div>
        </div>
        <div id="input-container">
          <div id="mail" class="group">
            <input
             v-on:click="res.class = '',
                     res.text = '' "
             id="txtEmail" type="email">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Mail:</label>
          </div>

          <div id="pass" class="group">
            <input
             v-on:click="res.class = '',
             res.text = '' "
             id="txtPassword" type="password">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Clave:</label>
          </div>

          <h4 id="res" class="res" :class="res.class" v-text="res.text"></h4>

        </div>
        <div class="btn-container">
          <button
           id="btnLogin"
           class="btn btn-action"
           v-on:click="signInUser()">
            Entrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import helpers from '../helpers'
import axios from 'axios'
import { log } from 'util';

const urlSignIn = `${helpers.api}signin`;

export default {
  name: 'Login',
  components:{
  },
   data() {
    return {
      res: {
        text: '',
        class: '',
      }
    };
  },
  methods: {
    signInUser: function() {
      var thisComponent = this;

      axios.post(urlSignIn, {
        email: txtEmail.value,
        password: txtPassword.value,
        type: "pro"
      })
      .then(function(response) {
        //redirect create and save token in browser
        localStorage.setItem('token', response.data.token);
        //redirect logic
        if (response.status == '200') {

          console.log(response.data.user.public_Id);
          let userId = response.data.user.public_Id

          thisComponent.res.text = 'Entrando!'
          thisComponent.res.class = 'ok'

          setTimeout(() => {
            thisComponent.$router.push(`/${userId}/dashboard`)
          }, 500);
        }
      })
      .catch(function(error) {
        thisComponent.res.text = 'error en tu email o contraseña'
        thisComponent.res.class = 'err'
      });
    },
    signOutUser: function() {
      localStorage.clear();
    },
  }

}
</script>

<style lang="scss">

@import "~globscss/main.scss";

.res{
  text-align: center;
  font-weight: 200;
  width: 100%;
  margin: 0;
  transition: 0.2s ease all;
}

.ok{
  width: 100%;
  margin: 0 0 2em 0;
  padding: 1em;
  min-height: auto;
  background-color: $color-ok;
  color: $color-3;
  transition: 0.2s ease all;
}
.err{
  width: 100%;
  margin: 0 0 2em 0;
  padding: 1em;
  min-height: auto;
  background-color: $color-err;
  color: $color-3;
  transition: 0.2s ease all;
}

.log{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  max-width: 300px;
  font-family: $font-1;
  background-color: $color-1;
  border-radius: 0.6rem;
  transition: 0.2s ease all;
  @media only screen and (max-width: 520px) {
    margin: auto 1em;
  }
}

.log-in{
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 1rem;
  width: auto;
  padding: 0.4rem;
  transition: 0.2s ease all;
}

.log-header {
  align-items: center;
  justify-items: center;
  .log-item{
    padding-bottom: 2em;
    img{
      width: 100%;
      max-width: 10em;
    }
  }
}

.btn-secundary{
  &:hover{
    color: $color-1;
    background-color: $color-2;
    box-shadow:0 4px 8px rgba($color-3, .15);
    transition: 0.2s ease all;
  }
}

.btn-action{
  color: $color-2;
  background-color: $color-1;
  border: 2px solid $color-2;
  &:hover{
    color: $color-1;
    background-color: $color-2;
    border: 2px solid $color-2;
    box-shadow:0 4px 8px rgba($color-3, .15);
    transition: 0.2s ease all;
  }
}

#input-container{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  width: 80%;
}

.group{
  display: flex;
  justify-content: center;
  flex-direction: column;
  position:relative;
  margin-bottom: 2em;
  width: 100%;
}

#pass{
  input{
   padding: 10px 0px 12px 54px;
  }
  input:focus {
  padding: 10px 10px 12px 10px;
}

}
input {
  font-family: $font-1;
  font-size: 14px;
  font-weight: 300;
  padding: 10px 10px 12px 44px;
  display: block;
  max-width: 100%;
  border: none;
  border-bottom: 1px solid $color-5;
}

input:focus {
  outline: none;
  border-bottom: 0px;
  padding: 10px 10px 12px 10px;
}
/* LABEL  */
label {
  color: $color-3;
  font-family: $font-1;
  font-size: 16px;
  font-weight: 300;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 9px;
  transition: 0.2s ease all;
}
/* active state */
input:focus ~ label {
  top: -1em;
  font-size: 14px;
  color: $color-3;
}
/* BOTTOM BARS  */
.bar {
  position: relative;
  display: block;
  min-width: 200px;
}

.bar:after,
.bar:before {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: $color-3;
  transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}
/* active state */
input:focus ~ .bar:after,
input:focus ~ .bar:before {
  width: 50%;
}
/* HIGHLIGHTER = */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}
/* active state */
input:focus ~ .highlight {
  animation:inputHighlighter 0.3s ease;
}
/* ANIMATIONS */
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}

</style>

