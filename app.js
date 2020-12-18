function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100
    };
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      console.log(this.monsterHealth);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    }
  }

});

game.mount('#game');