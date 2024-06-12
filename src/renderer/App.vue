<script setup>
import { ref, reactive } from "vue"
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { useStore } from "@/stores/store.js"
import Box from "@/components/TheBox.vue";
import Modal from "@/components/TheModal.vue"
const store = useStore()
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const activeModal = ref(true)

const state = reactive({
  clearColor: "#111",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
});

const winningCombinations = [
  // Горизонтальные линии в каждом слое
  [[-1, -1, -1], [-1, -1, 0], [-1, -1, 1]],
  [[-1, 0, -1], [-1, 0, 0], [-1, 0, 1]],
  [[-1, 1, -1], [-1, 1, 0], [-1, 1, 1]],
  [[0, -1, -1], [0, -1, 0], [0, -1, 1]],
  [[0, 0, -1], [0, 0, 0], [0, 0, 1]],
  [[0, 1, -1], [0, 1, 0], [0, 1, 1]],
  [[1, -1, -1], [1, -1, 0], [1, -1, 1]],
  [[1, 0, -1], [1, 0, 0], [1, 0, 1]],
  [[1, 1, -1], [1, 1, 0], [1, 1, 1]],
  // Вертикальные линии в каждом слое
  [[-1, -1, -1], [0, -1, -1], [1, -1, -1]],
  [[-1, -1, 0], [0, -1, 0], [1, -1, 0]],
  [[-1, -1, 1], [0, -1, 1], [1, -1, 1]],
  [[-1, 0, -1], [0, 0, -1], [1, 0, -1]],
  [[-1, 0, 0], [0, 0, 0], [1, 0, 0]],
  [[-1, 0, 1], [0, 0, 1], [1, 0, 1]],
  [[-1, 1, -1], [0, 1, -1], [1, 1, -1]],
  [[-1, 1, 0], [0, 1, 0], [1, 1, 0]],
  [[-1, 1, 1], [0, 1, 1], [1, 1, 1]],
  // Глубинные линии
  [[-1, -1, -1], [-1, 0, -1], [-1, 1, -1]],
  [[-1, -1, 0], [-1, 0, 0], [-1, 1, 0]],
  [[-1, -1, 1], [-1, 0, 1], [-1, 1, 1]],
  [[0, -1, -1], [0, 0, -1], [0, 1, -1]],
  [[0, -1, 0], [0, 0, 0], [0, 1, 0]],
  [[0, -1, 1], [0, 0, 1], [0, 1, 1]],
  [[1, -1, -1], [1, 0, -1], [1, 1, -1]],
  [[1, -1, 0], [1, 0, 0], [1, 1, 0]],
  [[1, -1, 1], [1, 0, 1], [1, 1, 1]],
  // Диагонали в каждом слое
  [[-1, -1, -1], [-1, 0, 0], [-1, 1, 1]],
  [[-1, -1, 1], [-1, 0, 0], [-1, 1, -1]],
  [[0, -1, -1], [0, 0, 0], [0, 1, 1]],
  [[0, -1, 1], [0, 0, 0], [0, 1, -1]],
  [[1, -1, -1], [1, 0, 0], [1, 1, 1]],
  [[1, -1, 1], [1, 0, 0], [1, 1, -1]],
  // Диагонали между слоями
  [[-1, -1, -1], [0, 0, -1], [1, 1, -1]],
  [[-1, -1, 0], [0, 0, 0], [1, 1, 0]],
  [[-1, -1, 1], [0, 0, 1], [1, 1, 1]],
  [[-1, 1, -1], [0, 0, -1], [1, -1, -1]],
  [[-1, 1, 0], [0, 0, 0], [1, -1, 0]],
  [[-1, 1, 1], [0, 0, 1], [1, -1, 1]],
  [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
  [[-1, -1, 1], [0, 0, 0], [1, 1, -1]],
  [[-1, 1, -1], [0, 0, 0], [1, -1, 1]],
  [[-1, 1, 1], [0, 0, 0], [1, -1, -1]]
];

const boxs = ref([
])

function createBoxs() {
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        boxs.value.push({
          position: [x, y, z],
          value: 'white'
        })
      }
    }
  }
}

createBoxs()


function select(event, box) {
  event.stopPropagation();
  if (box.value != 'white') {
    return
  }
  box.value = store.turn;
  store.selectBox()
  checkWinner()
}

function checkWinner() {
  let board = []
  for (let i = 0; i < Math.ceil(boxs.value.length / 9); i++) {
    const chunk = boxs.value.slice((i * 9), (i * 9) + 9);
    board[i] = []
    for (let j = 0; j < Math.ceil(chunk.length / 3); j++) {
      board[i][j] = chunk.slice((j * 3), (j * 3) + 3);
    }
  }

  for (let combination of winningCombinations) {
    const [a, b, c] = combination.map(([x, y, z]) => [x + 1, y + 1, z + 1]);

    if (board[a[0]][a[1]][a[2]].value != 'white' &&
      board[a[0]][a[1]][a[2]].value === board[b[0]][b[1]][b[2]].value &&
      board[a[0]][a[1]][a[2]].value === board[c[0]][c[1]][c[2]].value) {
      store.turn = board[a[0]][a[1]][a[2]].value
      store.turnTitle = `Winner ${board[a[0]][a[1]][a[2]].value}`
      store.winner = true
      activeModal.value = true
    }
  }

  return null;

}


function reset() {
  store.reset()
  boxs.value.forEach(box => {
    box.value = 'white'
  })
  activeModal.value = false
}
</script>

<template>
  <div class="app">
    <Modal v-show="activeModal" @close="activeModal = false; reset()" />
    <div class="reset" @click="activeModal = true">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
        <path fill="currentColor"
          d="M27 8H6.83l3.58-3.59L9 3L3 9l6 6l1.41-1.41L6.83 10H27v16H7v-7H5v7a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2" />
      </svg>
    </div>

    <div class="turn" :class="[store.turn]">{{ store.turnTitle }}</div>

    <div class="game">
      <TresCanvas class="scene" v-bind="state">
        <TresPerspectiveCamera />
        <OrbitControls />
        <TresDirectionalLight :position="[1, 2, 3]" :intensity="1" cast-shadow />
        <TresDirectionalLight :position="[-1, -2, -3]" :intensity="1" cast-shadow />
        <Suspense>
          <Box v-for="box in boxs" :box="box" @double-click="select($event, box)" />
        </Suspense>

        <TresAmbientLight :intensity="1" />
      </TresCanvas>
    </div>
  </div>
</template>

<style scoped></style>
