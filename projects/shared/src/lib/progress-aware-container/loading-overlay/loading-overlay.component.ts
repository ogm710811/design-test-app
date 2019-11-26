import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProgressContextService} from '../progress-context.service';

@Component({
  selector: 'fox-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent implements OnChanges, OnInit, OnDestroy {
  @Input() tag?: string;

  loading: boolean = false;

  private loadingCountSub?: Subscription;

  constructor(private progressCtx: ProgressContextService, private cdRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tag && !changes.tag.firstChange) {
      if (this.loadingCountSub) {
        this.loadingCountSub.unsubscribe();
      }
      if (this.progressCtx) {
        const localCtx: ProgressContextService = this.tag ? this.progressCtx.forTag(this.tag) : this.progressCtx;
        this.loadingCountSub = localCtx.loadingCountChange.subscribe(count => {
          this.loading = count > 0;
          this.cdRef.detectChanges();
        });
      }
    }
  }

  ngOnInit(): void {
    if (this.progressCtx) {
      const localCtx: ProgressContextService = this.tag ? this.progressCtx.forTag(this.tag) : this.progressCtx;
      this.loadingCountSub = localCtx.loadingCountChange.subscribe(count => {
        this.loading = (count > 0);
        this.cdRef.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.loadingCountSub) {
      this.loadingCountSub.unsubscribe();
    }
  }
}
