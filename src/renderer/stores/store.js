import { ref, watch } from "vue"
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {

  const countPlayers = ref(4);
  const players = ['blue', 'red', 'green', 'yellow']
  const winner = ref(false)

  let alternateColor = {}
  players.slice(0, countPlayers.value).forEach((player, index) => {
    alternateColor[player] = players.slice(0, countPlayers.value)[(index + 1) >= players.slice(0, countPlayers.value).length ? 0 : index + 1]
  })

  watch(() => countPlayers.value, () => {
    alternateColor = {}
    players.slice(0, countPlayers.value).forEach((player, index) => {
      alternateColor[player] = players.slice(0, countPlayers.value)[(index + 1) >= players.slice(0, countPlayers.value).length ? 0 : index + 1]
    })
  })

  const turn = ref('blue')
  const turnTitle = ref('Blue player\'s turn')

  function selectBox() {
    turn.value = alternateColor[turn.value]
  }


  function changeTitle() {
    turnTitle.value = `${turn.value[0].toLocaleUpperCase() + turn.value.slice(1, turn.value.length)} player\'s turn`
  }

  watch(turn, changeTitle)

  function reset() {
    winner.value = false
    turn.value = 'blue'
    changeTitle()
  }

  return { turn, turnTitle, reset, changeTitle, selectBox, countPlayers, winner }
})
