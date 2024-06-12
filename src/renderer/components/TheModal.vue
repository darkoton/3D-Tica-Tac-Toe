<script setup>
import { useStore } from "@/stores/store"
const store = useStore()

defineEmits(['close'])
</script>

<template>
  <div class="modal">

    <div class="modal-body">
      <div class="modal-global-title">3D Tic Tac Toe</div>

      <div class="modal-subtitle" :class="store.turn" v-if="store.winner">{{ store.turnTitle }}</div>

      <div class="modal-title">Start?</div>

      <div class="modal-buttons">
        <div class="modal-button" @click="store.countPlayers = 2; $emit('close')"><span>1 VS 1</span></div>
        <div class="modal-button" @click="store.countPlayers = 3; $emit('close')"><span>1 VS 1 VS 1</span></div>
        <div class="modal-button" @click="store.countPlayers = 4; $emit('close')"><span>1VS 1 VS1 VS 1</span></div>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-title {
  text-align: center;
  font-size: 40px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.modal-button {
  font-size: 30px;
  padding: 15px 25px;
  position: relative;
  line-height: 25px;
  cursor: pointer;
}

.modal-button span {
  position: relative;
  z-index: 2;
}

.modal-button:nth-child(1):before {
  content: '';
  width: 50%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(54, 54, 252);
}

.modal-button:nth-child(1):after {
  content: '';
  width: 50%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: rgb(255, 40, 40);
}

.modal-button:nth-child(2) {
  background-color: rgb(28, 185, 28);
}

.modal-button:nth-child(2):before {
  content: '';
  width: 33%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(54, 54, 252);
}

.modal-button:nth-child(2):after {
  content: '';
  width: 33%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: rgb(255, 40, 40);
}

.modal-button:nth-child(3) {
  background: linear-gradient(90deg, rgb(28, 185, 28) 50%, rgb(228, 228, 36) 50%);
}

.modal-button:nth-child(3):before {
  content: '';
  width: 25%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(54, 54, 252);
}

.modal-button:nth-child(3):after {
  content: '';
  width: 25%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: rgb(255, 40, 40);
}

.modal-subtitle {
  font-size: 40px;
  font-weight: bold;
}

.blue {
  color: rgb(54, 54, 252);
}

.red {
  color: rgb(255, 40, 40);
}

.green {
  color: rgb(28, 185, 28);
}

.yellow {
  color: rgb(228, 228, 36);
}

.modal-global-title {
  font-size: 50px;
  margin-bottom: 20px;
  color: #fff;
}
</style>