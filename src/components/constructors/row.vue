<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'row'
}
</script>

<style lang="scss">

  @import '~globscss/mi-grid.scss';
  @import '~globscss/components/core';
  @import '~globscss/components/media-queries';
  @import '~globscss/components/_flexbox';

  // .row{
  //   padding: 0.5rem;
  //   @include flex;
  //   @include edItem(100, 50, 25, 25);
  //   flex-direction: column;
  // }
</style>
