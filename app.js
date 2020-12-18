function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      counterSpecial: 0,
      winner: null,
      battleLogs: []
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
      this.battleLogs= [];
    },
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.counterSpecial++;
      this.battleLogs.unshift('Player attacks monster -' + attackValue + ' points');
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.battleLogs.unshift('Monser attacks player -' + attackValue + ' points');
    },
    specialAttack() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.counterSpecial = 1,
      this.battleLogs.unshift('Player make special attack to monster -' + attackValue + ' points');
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = getRandomValue(10, 25);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.battleLogs.unshift('Player heals himself +' + healValue + ' points');
      this.attackPlayer();
    },
    surrender() {
      this.playerHealth = 0;
      this.battleLogs.unshift('Player surrend');
    }
  }

});

game.mount('#game');