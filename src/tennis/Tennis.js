import { numericToTennisScoreMap, DEFAULT_TENNIS_SCORES } from './constants.js';

export class Tennis {
  constructor() {
    // Singleton
    if (!Tennis.instance) {
        Tennis.instance = this;
        this.numericScores = { player0: 0, player1: 0 };
        this.tennisScore = DEFAULT_TENNIS_SCORES.love;
    }

    return Tennis.instance;
  }

  getScores() {
    return this.tennisScore;
  }

  trackScore(data) {
    const { data: { pointWonByPlayer } } = data;
    const winner = this.#calculateScore(pointWonByPlayer);
    if (winner) {
      console.log(`And the WINNER is :=> ${winner}`)
      return true;
    }
  }

  #calculateScore(pointWonByPlayer) {
    // prev scores
    const prevScorePlayer1 = this.numericScores.player0;
    const prevScorePlayer2 = this.numericScores.player1;
    console.log("PREV SCORES => ", prevScorePlayer1, prevScorePlayer2)

    // increment score
    this.numericScores[`player${pointWonByPlayer}`] += 1;
    
    // updated scores
    const scorePlayer1 = this.numericScores.player0;
    const scorePlayer2 = this.numericScores.player1;
    console.log("UPDATED_SCORES =>", scorePlayer1, scorePlayer2)

    if (
      (scorePlayer1 >=4 || scorePlayer2 >= 4) &&
      Math.abs(scorePlayer1 - scorePlayer2) >= 2
    ) {
      return `player${pointWonByPlayer}`
    }

    if (prevScorePlayer1 === prevScorePlayer2 && prevScorePlayer1 >= 3) {
      this.tennisScore = `${DEFAULT_TENNIS_SCORES.advantage}${pointWonByPlayer}`
      console.log('TENNIS_SCORES', this.tennisScore, "\n")
    }

    // if scores are equal and above 3
    if (scorePlayer1 === scorePlayer2 && scorePlayer1 >= 3) {
      this.tennisScore = `${DEFAULT_TENNIS_SCORES.deuce}`;
      console.log('TENNIS_SCORES =>', this.tennisScore, "\n")
      return;
    }

    // if scores less than 3
    if (scorePlayer1 <= 3 && scorePlayer2 <= 3) {
      this.tennisScore = `${numericToTennisScoreMap[scorePlayer1]}-${numericToTennisScoreMap[scorePlayer2]}`;
      console.log('TENNIS_SCORES =>', this.tennisScore, "\n")
    }
  }
}
