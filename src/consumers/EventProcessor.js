import { EventStream } from '../producers/EventStream.js';
import { Tennis } from '../tennis/Tennis.js';

export class EventProcessor {
  constructor() {

    // Singleton
    if (!EventProcessor.instance) {
      this.eventStream = new EventStream();
      EventProcessor.instance = this;
      this.tennis$ = new Tennis();
    }
    return EventProcessor.instance;
  }

  startProcessing() {
    this.eventStream.subscribe((event) => this.applyBusinessLogic(event));
  }

  applyBusinessLogic(event) {
    console.log(`Round Won By: player${event?.data?.pointWonByPlayer}`);
    const matchEnded = this.tennis$.trackScore(event);
    if (matchEnded) {
      this.eventStream.unsubscribe();
    }
  }
}
