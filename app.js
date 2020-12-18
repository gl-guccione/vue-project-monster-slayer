function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      counterSpecial: 0
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth > 0) {
        return {width: this.monsterHealth + '%'};
      } else {
        return {width: '0%'};
      }
    },
    playerBarStyles() {
      if (this.playerHealth > 0) {
        return {width: this.playerHealth + '%'};
      } else {
        return {width: '0%'};
      }
    }
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.counterSpecial++;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.counterSpecial = 1,
      this.attackPlayer();
    }
  }

});

game.mount('#game');