import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from './constants.js';

export class EventStream {
    constructor() {

      // Singleton
      if (!EventStream.instance) {
        this.event$ = interval(CONSTANTS.EVENT_EMIT_INTERVAL).pipe(
          map(() => ({
            timestamp: new Date(),
            data: {
              pointWonByPlayer: Math.random() < CONSTANTS.MATH_RANDOM_FACTOR ? 0 : 1 }
          }))
        );

        EventStream.instance = this;
      }

      return EventStream.instance;
    }
  
    subscribe(callback) {
      this.subscription = this.event$.subscribe(callback);
      console.log("Subscribed from event stream.");
    }
  
    unsubscribe() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        console.log("Unsubscribed from event stream.");
      }
    }
}
