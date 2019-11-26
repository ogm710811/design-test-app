import {EventEmitter, Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressContextService {

  loadingCountChange: Observable<number>;
  private _loadingCountChange: EventEmitter<number>;
  private _loadingCountChangeSubscription: Subscription;

  get isLoading(): boolean {
    return this.loadingCount > 0;
  }

  private loadingCount: number = 0;
  private tagMap: { [tag: string]: ProgressContextService } = {};

  constructor() {
    this._loadingCountChange = new EventEmitter<number>();
    // We use ReplaySubject to replay the previous loadingCount change on subscription. This way,
    // if the subscription is late, it will retrieve the current state of the count without having
    // to worry about race conditions, since any subsequent events will be delivered almost
    // immediately if it occurs in sequence.
    this.loadingCountChange = new ReplaySubject<number>(1);
    this._loadingCountChangeSubscription = this._loadingCountChange.subscribe(this.loadingCountChange);
  }

  clearTagMap(): void {
    const ctxs: ProgressContextService[] = Object.values(this.tagMap);
    for (const ctx of ctxs) {
      ctx.onRemove();
    }
    this.tagMap = {};
  }

  forTag(tag: string): ProgressContextService {
    if (!this.tagMap.hasOwnProperty(tag) || !this.tagMap[tag]) {
      this.tagMap[tag] = new ProgressContextService();
    }
    return this.tagMap[tag];
  }

  loading(): void {
    this._loadingCountChange.emit(++this.loadingCount);
  }

  loaded(): void {
    if (this.loadingCount > 0) {
      this._loadingCountChange.emit(--this.loadingCount);
    }
  }

  watch<T>(obs: Observable<T>): Observable<T> {
    this.loading();

    return obs.pipe(
      finalize(
        () => {
          this.loaded();
        }));
  }

  onRemove(): void {
    this.clearTagMap();
    this._loadingCountChange.complete();
    this._loadingCountChangeSubscription.unsubscribe();
  }
}
