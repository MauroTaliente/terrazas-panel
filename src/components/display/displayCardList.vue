<template>
  <div :class="['general', displayCard]">
    <h4 class="label"
        v-if="name">
       {{ name }}
    </h4>
    <ul class="contentContainer">
      <li v-for="item in items"
          :key="item._id"
          class="itemContainer">
        <div class="itemCard">
          <div class="info">
            <h4 class="number"
              v-show="cardList">
              {{ item.nStore }}
            </h4>
            <h4 class="name">
              {{ item.name }}
            </h4>
          </div>
          <img class="image"
            :src="`${item.logo}`"
            :alt="item.name"
            v-if="`${item.logo}` !== url">
          <img class="image"
            :src="`${url}upload/stores/sin-logo.jpg`"
            :alt="item.name"
            v-if="`${url}${item.logo}` == url">
          <div v-if="editMode"
               class="controles">
            <span class="btn btnAgregar"
              v-if="!more"
              v-on:click="emitEvent('add', item)">
              <i class="material-icons">add</i>
            </span>
            <span class="btn btnEliminar"
              v-if="more"
              v-on:click="emitEvent('remove', item)">
              <i class="material-icons">remove</i>
            </span>
          </div>
          <div v-if="controls && !editMode"
               class="controles">
            <span class="btn"
              v-on:click="emitEvent('edit', item)" >
              <i class="material-icons">border_color</i>
            </span>
            <span class="btn btnEliminar"
              v-on:click="emitEvent('delete', item._id)">
              <i class="material-icons">delete</i>
            </span>
            <div class="estado">
              <i class="material-icons on"
                v-if="item.state">done</i>
              <i class="material-icons off"
                  v-if="!item.state">not_interested</i>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- <code>{{ $data.itemsData }}</code> -->
  </div>
</template>

<script>

export default {
  name: 'displayList',
  props:{
    name: '',
    items: '',
    scroll: '',
    url: '',
    more: {type: Boolean},
    cardList: {type: Boolean},
    imageKey: '',
    editMode: {type: Boolean},
    controls: {type: Boolean},
  },
  data (){
    return{
      item:{
        _id: '',
        name: '',
      }
    }
  },
   methods:{
    emitEvent(action, el){
      this.$emit('emitEvent', action, el);
    }
  },
  created () {
    this.itemsData = this.items
  },
  computed:{
    displayCard (){
      return (this.cardList)? 'displayList' : 'displayCard'
    },
  }
}
</script>

<style lang="scss">

@import '~globscss/mi-grid.scss';
@import "~globscss/main.scss";
@import '~globscss/components/core';
@import '~globscss/components/media-queries';
@import '~globscss/components/flexbox';


.general{
  @include flex;
  @include edContainer;
  padding: 0.5rem;
  width: 100%;
  .contentContainer{
    @include flex;
    width: 100%;
    margin: 0;
  }
}

.displayList{
  .itemContainer{
    @include flex;
    @include  edItem(100);
    padding-bottom: 0.4rem;
  }
  .itemCard{
    @include edItem(100);
    padding: 0.5rem 1rem;
    flex-direction: row;
    justify-content:  space-between;
    .image{
      display: none;
      transition: 0.2s ease all;
    }
    .info{
      h4{
        font-size: 0.9rem;
      }
      .name{
        position: relative;
      }
      .number{
        @include flex;
        position: relative;
        margin: 0 1rem 0 0;
        align-items: center;
        &::after{
          content: '';
          right: -0.5rem;
          position: absolute;
          width: 1px;
          height: 2.2rem;
          background-color: $color-fondo;
        }
      }
    }
    .controles{
      .btn{
        border-width: 1px;
        padding: 0.35rem 0.65rem;
        margin-right: 0.4rem;
        i{
          font-size: 1rem;
        }
      }
      .estado{
        transition: 0.2s ease all;
        i{
          font-size: 1rem;
           padding: 0.4rem;
        }
      }
    }
  }
}

.displayCard{
  .itemContainer{
    @include flex;
    @include  edItem(100,50,33.33,25);
    padding: 0.4rem;
  }
  .itemCard{
    @include edItem(100);
    padding: 1rem 0;
    flex-direction: colum;
    justify-content:  center;
    .image{
      display: block;
      transition: 0.2s ease all;
    }
    .info{
      align-self: flex-start;
      padding-bottom: 1rem;
      padding-left: 1.5rem;
      h4{
        font-size: 1rem;
      }
      .name{
        position: relative;
      }
      .number{
        @include flex;
        position: relative;
        margin: 0 1rem 0 0;
        align-items: center;
        &::after{
          content: '';
          right: -0.5rem;
          position: absolute;
          width: 1px;
          height: 2.2rem;
          background-color: $color-fondo;
        }
      }
    }
    .controles{
      padding-top: 1rem;
      .btn{
        border-width: 2px;
        padding: 0.5em 1em;
        margin-right: 0.4rem;
        i{
          font-size: 1.5rem;
        }
      }
      .estado{
        position: absolute;
        top: 4rem;
        right: 1rem;
        transition: 0.2s ease all;
        i{
          font-size: 1.2rem;
           padding: 0.6rem;
        }
      }
    }
  }
}

  .itemCard{
    @include flex;
    position: relative;
    margin-bottom: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    border-radius: 0.2rem;
    background-color: $color-6;
    color: $color-5;
    border: 1px solid $color-fondo;
    overflow: hidden;
    .info{
      @include flex;
      h4{
        @include flex;
        font-weight: 300;
        align-self: flex-start;
        letter-spacing: 0.1em;
      }
    }
    .controles{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .btn{
        @include flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.2rem;
      }
      .btnEliminar{
        border: 2px solid $color-err;
      }
      .estado{
        @include flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        color: $color-4;
        background-color:  rgba($color-3, 1);
        i{
          font-size: 1.2rem;
        }
      }
    }
  }

</style>
