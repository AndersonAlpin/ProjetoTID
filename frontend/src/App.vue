<template>
  <div id="app">
    <router-view />
    <template v-if="showFundo">
      <div class="fundo fundo-esquerdo">
        <b-image :src="require('@/assets/icons/controle1.png')"></b-image>
      </div>
      <div class="fundo fundo-direito">
        <b-image :src="require('@/assets/icons/controle2.png')"></b-image>
      </div>
    </template>
  </div>
</template>

<script>
import barramento from "@/barramento";

export default {
  data() {
    return {
      showFundo: true,
    };
  },
  created() {
    barramento.quandoAbrirSobre((result) => (this.showFundo = result));
    barramento.quandoSairSobre((result) => (this.showFundo = result));
  },
};
</script>

<style>
#app {
  position: relative;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fundo {
  position: absolute;
  filter: invert(25%);
  width: 20%;
}

.fundo-esquerdo {
  top: 15%;
  left: 0%;
}

.fundo-direito {
  top: 55%;
  right: 0%;
}

/* Media Screen */
@media screen and (max-device-width: 1024px) {
  .fundo {
    display: none;
  }
}
</style>
