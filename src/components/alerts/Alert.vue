<template>
  <section class="backGround">
    <div class="alerCard">
      <div class="header">
        <h4>
          {{ name }}
        </h4>
      </div>
      <div class="text">
        <p>
          {{ text }}
        </p>
      </div>
      <div class="btnGrup">
        <span class="btn btnRed"
              @click="acp()">
          {{ acpText }}
        </span>
       <span class="sep"></span>
        <span class="btn"
              @click="can()">
          {{ canText }}
        </span>
      </div>
    </div>
    <!-- <pre><code>{{ $props }}</code></pre> -->
  </section>
</template>

<script>

export default {
  name: 'Alert',
  props: {
    name: '',
    text: '',
    elId: '',
    acpText: '',
    canText: '',
    type: ''
  },
  data (){
    return{
    }
  },
  methods: {
    acp() {
      let el = this.elId        
      this.$emit('acp', el);
      this.can()
    },
    can() {
      this.$emit('can');
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "~globscss/main.scss";

  .backGround{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: #18181deb;
  }
  .alerCard{
    @include blueCard;
    max-width: 400px;
  }
  .header {
    padding: 1.5rem 1rem 1rem 1rem;
    border-bottom: 2px solid $color-6;
  }
  h4{
    font-size: 1em;
    font-weight: 200;
    letter-spacing: 0.1em;
  }
  .text{
    padding: 1rem;
  }
  p{
    font-size: 0.9em;
    font-weight: 200;
  }
  .btnGrup{
    position: relative;
    display: flex;
    padding: 1rem;
    justify-content: center;
    .sep{
      width: 1rem;
      height: 100%;
    }
  }
</style>
