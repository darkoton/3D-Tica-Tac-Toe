<script setup>
import { ref, watch } from 'vue';
import { useTexture } from '@tresjs/core';
// import * as Three from 'three';

const props = defineProps(['box']);

const textures = {
  blue: await useTexture(['/blue.png']),
  red: await useTexture(['/red.png']),
  green: await useTexture(['/green.png']),
  yellow: await useTexture(['/yellow.png']),
  white: await useTexture(['/white.png'])
};

// const materials = {
//   blue: new Three.MeshStandardMaterial({ map: textures.blue }),
//   red: new Three.MeshStandardMaterial({ map: textures.red }),
//   green: new Three.MeshStandardMaterial({ map: textures.green }),
//   yellow: new Three.MeshStandardMaterial({ map: textures.yellow }),
//   white: new Three.MeshStandardMaterial({ map: textures.white }),
// };

// const geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);
// const model = ref(new Three.Mesh(geometry, materials.white));

watch(() => props.box.value, (newValue) => {
  // model.value.material.map = textures[newValue];
  color.value = newValue
});

const color = ref('white')
</script>

<template>
  <TresMesh :position="box.position">
    <TresBoxGeometry :args="[0.5, 0.5, 0.5]" />
    <TresMeshStandardMaterial :map="textures[color]" />
  </TresMesh>
  <!-- <primitive :object="model" :position="box.position" /> -->
</template>
