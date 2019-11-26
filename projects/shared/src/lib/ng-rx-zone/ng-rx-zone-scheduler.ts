import {NgZone} from '@angular/core';
import {SchedulerLike, Subscription} from 'rxjs';

class LeaveNgRxZoneScheduler implements SchedulerLike {
  constructor(private zone: NgZone, private scheduler: SchedulerLike) {
  }

  schedule(...args: any[]): Subscription {
    return this.zone.runOutsideAngular(() => {
      // @ts-ignore
      return this.scheduler.schedule.apply(this.scheduler, args);
    });
  }

  now(): number {
    return this.scheduler.now();
  }
}

class EnterNgRxZoneScheduler implements SchedulerLike {
  constructor(private zone: NgZone, private scheduler: SchedulerLike) {
  }

  schedule(...args: any[]): Subscription {
    return this.zone.run(() => {
      // @ts-ignore
      return this.scheduler.schedule.apply(this.scheduler, args);
    });
  }

  now(): number {
    return this.scheduler.now();
  }
}

export function leaveZone(zone: NgZone, scheduler: SchedulerLike): SchedulerLike {
  return new LeaveNgRxZoneScheduler(zone, scheduler);
}

export function enterZone(zone: NgZone, scheduler: SchedulerLike): SchedulerLike {
  return new EnterNgRxZoneScheduler(zone, scheduler);
}
