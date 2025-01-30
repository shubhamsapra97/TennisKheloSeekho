import { EventProcessor } from './consumers/EventProcessor.js';
import { EventStream } from './producers/EventStream.js';


const initTennisGame = () => {
    const eventProcessor = new EventProcessor()
    const eventStream = new EventStream()

    eventProcessor.startProcessing();
}

initTennisGame();