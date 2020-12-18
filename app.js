function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      counterSpecial: 0,
      winner: null
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    }
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
    startGame() {
      this.monsterHealth =  100;
      this.playerHealth = 100;
      this.winner = null;
      this.counterSpecial = 0;
    },
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
    },
    healPlayer() {
      const healValue = getRandomValue(10, 25);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    }
  }

});

game.mount('#game');