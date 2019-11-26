import {browser, by, element, ElementArrayFinder, ElementFinder, promise as wdp} from 'protractor';

export class FoxUiDashboard {

  directPath = '/dashboard';

  private messageBoxCloseButton = 'fox-message__close-btn';
  private btnIdReports = 'btn-reports';
  private matSelectIdTeam = 'select-team';
  private matSelectIdUser = 'select-user';
  private matSelectIdTimeframe = 'select-timeframe';
  private inputIdStartDate = 'input-start-dt';
  private inputIdEndDate = 'input-end-dt';
  private btnIdUpdateTimeframe = 'btn-update-timeframe';
  private thIdSortTeam = 'th-sort-team';
  private thIdSortUser = 'th-sort-user';
  private thIdSortLookups = 'th-sort-lookups';
  private thIdSortHours = 'th-sort-hours';
  private thIdSortMatch = 'th-sort-match';
  private thIdSortNoMatch = 'th-sort-no-match';
  private thIdSortTotal = 'th-sort-total';
  private matSelectIdPgSize = 'select-page-size';
  private anchorIdPgPrev = 'lnk-pg-prev-dash';
  private anchorIdPgNext = 'lnk-pg-next-dash';
  private anchorIdBasePgNum = 'lnk-pg-num';

  private anchorTextCurrentStats = 'Current Statistics';
  private anchorTextOpReport = 'Historical Statistics';
  private anchorTextBypassQueue = 'Bypass Queue';
  private anchorTextBypassQueueManagement = 'B Queue Management';
  private anchorTextMemberLookupQueue = 'Member Lookup Queue';

  get messageBoxesCloseButton(): ElementArrayFinder {
    return element.all(by.css(`[class^=${this.messageBoxCloseButton}]`));
  }

  get reportsButton(): ElementFinder {
    return element(by.id(this.btnIdReports));
  }

  get teamMatSelect(): ElementFinder {
    return element(by.id(this.matSelectIdTeam));
  }

  get userMatSelect(): ElementFinder {
    return element(by.id(this.matSelectIdUser));
  }

  get timeframeMatSelect(): ElementFinder {
    return element(by.id(this.matSelectIdTimeframe));
  }

  get startDateInput(): ElementFinder {
    return element(by.id(this.inputIdStartDate));
  }

  get endDateInput(): ElementFinder {
    return element(by.id(this.inputIdEndDate));
  }

  get updateTimeframeButton(): ElementFinder {
    return element(by.id(this.btnIdUpdateTimeframe));
  }

  get teamSortTh(): ElementFinder {
    return element(by.id(this.thIdSortTeam));
  }

  get userSortTh(): ElementFinder {
    return element(by.id(this.thIdSortUser));
  }

  get lookupsSortTh(): ElementFinder {
    return element(by.id(this.thIdSortLookups));
  }

  get hoursSortTh(): ElementFinder {
    return element(by.id(this.thIdSortHours));
  }

  get matchSortTh(): ElementFinder {
    return element(by.id(this.thIdSortMatch));
  }

  get noMatchSortTh(): ElementFinder {
    return element(by.id(this.thIdSortNoMatch));
  }

  get totalSortTh(): ElementFinder {
    return element(by.id(this.thIdSortTotal));
  }

  get pageSizeMatSelect(): ElementFinder {
    return element(by.id(this.matSelectIdPgSize));
  }

  get previousPageAnchor(): ElementFinder {
    return element(by.id(this.anchorIdPgPrev));
  }

  get nextPageAnchor(): ElementFinder {
    return element(by.id(this.anchorIdPgNext));
  }

  get pageNumAnchors(): ElementArrayFinder {
    return element.all(by.css(`[id^=${this.anchorIdBasePgNum}]`));
  }

  get currentStatsAnchor(): ElementFinder {
    return element(by.linkText(this.anchorTextCurrentStats));
  }

  get opReportAnchor(): ElementFinder {
    return element(by.linkText(this.anchorTextOpReport));
  }

  get bypassQueueAnchor(): ElementFinder {
    return element(by.linkText(this.anchorTextBypassQueue));
  }

  get bypassQueueManagementAnchor(): ElementFinder {
    return element(by.linkText(this.anchorTextBypassQueueManagement));
  }

  get memberLookupQueueAnchor(): ElementFinder {
    return element(by.linkText(this.anchorTextMemberLookupQueue));
  }

  numberedPageAnchor(pageNum: number): ElementFinder {
    return element(by.id(this.anchorIdBasePgNum + pageNum + '-dash'));
  }

  navigateTo(): wdp.Promise<any> {
    return browser.get(this.directPath);
  }

}
