import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import {
  ConfigteamApi,
  ConfiguserApi,
  DashboardApi,
  PagedResourcesOfResourceOfTeamVO,
  ProductivityVO,
  ReferencesApi,
  ReportDetailVO,
  UseridsVO
} from '@fox/rest-clients';
import {
  FeatureFlagService,
  FoxValidators,
  HeaderRightItem,
  LoginService,
  ModalService,
  PageHeaderService,
  ProgressContextService,
  reportsFeature
} from '@fox/shared';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Rx';
import * as uuid from 'uuid';
import {FormDateGreaterThanCurrentDate} from '@fox/check-recovery';
import {CurrentStatisticsRightComponent} from './current-statistics-right/current-statistics-right.component';
import {TeamMemberInfo} from './current-statistics.model';
import {CurrentStatisticsService} from './current-statistics.service';

@Component({
  selector: 'fox-current-statistics',
  templateUrl: 'current-statistics.component.html',
  styleUrls: ['current-statistics.component.css']
})
export class CurrentStatisticsComponent implements OnInit, OnDestroy {

  @ViewChild('formDirective') formDirective;

  teamList: string[] = ['ALL'];
  selectedTeam?: string | undefined;
  selectedUser: string = this.loginSvc.loginState.username;
  selectedTimeframe: string;

  currentDayProcessed?: number;
  weekToDateProcessed?: number;
  monthToDateProcessed?: number;
  bypassCD?: number;
  bypassWTD?: number;
  bypassMTD?: number;
  isCustomTimeframe: boolean = true;
  dateToday: string;

  customDateStart = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator, this.startDateValidator, FormDateGreaterThanCurrentDate]);
  customDateEnd = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator, FormDateGreaterThanCurrentDate]);
  customDateStartParam: string | null;
  customDateEndParam: string | null;
  customDateFormGroup: FormGroup;
  isIndividualSelected: boolean = false;
  msReports: ReportDetailVO[] | undefined;
  nasReports: ReportDetailVO[] | undefined;
  buttonClickedSubscription: Subscription;
  currentNavChangeSubscription: Subscription;

  get hasSupervisorRole(): boolean {
    return this.loginSvc.hasSupervisorRole;
  }

  get reportModalVisible(): boolean {
    return this.modalService.reportModalVisible;
  }

  set reportModalVisible(visible: boolean) {
    this.modalService.reportModalVisible = visible;
  }

  get hasReleaseEnableReports(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled(reportsFeature);
  }

  get individualList(): string[] {
    let nameList: string[];
    nameList = ['ALL'];
    if (this.currentStatsSvc.teamMemberList) {
      this.currentStatsSvc.teamMemberList.forEach((item: TeamMemberInfo) => {
        nameList.push(item.firstName + ' ' + item.lastName);
      });
    }
    return nameList;
  }

  get currentDate(): string {
    return moment().format('MM/DD/YYYY');
  }

  get currentWeek(): string {
    let weekRange: string;
    const weekBegin: string = moment().day('Sunday').format('MM/DD');
    const weekEnd: string = moment().day('Saturday').format('MM/DD/YYYY');
    weekRange = weekBegin + ' - ' + weekEnd;
    return weekRange;
  }

  get currentMonth(): string {
    return moment().format('MM/YYYY');
  }

  get teamMemberList(): any {
    return this.currentStatsSvc.teamMemberList;
  }

  get productionInfoTab(): boolean {
    return this.pageHeaderService.currentNav === 1;
  }

  get queueStatisticsTab(): boolean {
    return this.hasSupervisorRole && this.pageHeaderService.currentNav === 2;
  }

  private now: moment.Moment;

  constructor(
    private currentStatsSvc: CurrentStatisticsService,
    private loginSvc: LoginService,
    private fb: FormBuilder,
    private bpmDashboardSvc: DashboardApi,
    private teamAPISvc: ConfigteamApi,
    private userAPISvc: ConfiguserApi,
    private progressSvc: ProgressContextService,
    private referencesSvc: ReferencesApi,
    private modalService: ModalService,
    private featureFlagSvc: FeatureFlagService,
    public pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private cdRef: ChangeDetectorRef
  ) {
    this.customDateFormGroup = this.fb.group({
      'customDateStart': this.customDateStart,
      'customDateEnd': this.customDateEnd
    }, {validator: this.endDateValidator});
  }

  ngOnInit(): void {
    this.now = moment();
    this.dateToday = moment().format('MM/DD/YYYY');
    moment().locale('en-us');
    this.selectedTimeframe = 'CurrentDay';
    this.isCustomTimeframe = true;

    if (this.loginSvc.hasOpReassignMemberLookup) {
      this.pageHeaderService.tabs = ['Production Info', 'Queue Statistics'];
    } else {
      this.pageHeaderService.tabs = ['Production Info'];
    }
    this.pageHeaderService.currentNav = 1;

    this.customDateStart.setValue(this.dateToday);
    this.customDateEnd.setValue(this.dateToday);

    const obs = this.userAPISvc.getUser(this.loginSvc.username, uuid());
    if (obs) {
      this.progressSvc.forTag('dash-init').watch(obs).subscribe(obj => {
        this.selectedTeam = undefined;
        this.getTeam();

        if (this.hasSupervisorRole) {
          this.selectedUser = 'ALL';
          this.getMembersSupervisor();
        } else if (obj.firstName && obj.lastName) {
          this.getMembers();
          this.selectedUser = CurrentStatisticsService.formatNameCasing(obj.firstName) + ' ' + CurrentStatisticsService.formatNameCasing(obj.lastName);
          this.isIndividualSelected = true;

          if (obj.userName) {
            this.productivity(obj.userName);
          }
        }
      });
    }
    this.selectedTimeframe = 'Custom';
    this.customDateStartParam = moment().format('YYYY-MM-DD');
    this.customDateEndParam = moment().format('YYYY-MM-DD');

    this.referencesSvc.listOperationalReport(uuid(), 'MLK', 'body', false).subscribe(res => {
      this.msReports = res.microStrategyReport;
      this.nasReports = res.nasDriveReport;
    });
    this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe(currentNav => this.cdRef.detectChanges());
    this.buttonClickedSubscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      if (item === 'reports_button') {
        this.reportModalVisible = true;
      }
    });
    this.pageHeaderService.customTitle = 'Member Lookup Dashboard';
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      CurrentStatisticsRightComponent,
      {
        reportsBtn: {
          identifier: 'reports_button',
          display: 'Reports',
          visible: this.hasReleaseEnableReports
        }
      },
      this.componentFactoryResolver,
      this.injector);
  }

  getTeam(): void {
    this.progressSvc.forTag('dash-init').watch(this.teamAPISvc.findTeam(uuid(), undefined, 1000)).subscribe((res: PagedResourcesOfResourceOfTeamVO) => {
      // get the team list
      if (this.teamList && res && res.page && res._embedded && res._embedded.items &&
        res.page.totalElements && res.page.totalElements > 0) {
        res._embedded.items.forEach(t => {
          if (t && t.code && t.id !== 9) {
            this.teamList.push(t.code);
          }
        });
      }

      this.selectedTeam = 'ALL';
    });
  }

  getMembers(): Subscription {
    return this.currentStatsSvc.fetchTeamMembers(undefined, 200, 0);
  }

  getMembersSupervisor(): void {
    const sub = this.getMembers();
    sub.add(() => {
      this.productivityForTeam();
    });
  }

  productivity(selectedUser: string): void {
    const uids: UseridsVO = {};
    uids.userid = [];
    uids.userid.push(selectedUser);
    if (!(uids === null || uids === undefined) && (uids.userid.length > 0)) {
      const obs: Observable<ProductivityVO> = this.bpmDashboardSvc.productivity(uids, uuid());
      if (obs) {
        this.progressSvc.forTag('dash-productivity').watch(obs).subscribe((obj: ProductivityVO) => {
          this.currentDayProcessed = obj.currentDay;
          this.weekToDateProcessed = obj.weekToDate;
          this.monthToDateProcessed = obj.monthToDate;
          this.bypassCD = obj.bypassCD;
          this.bypassWTD = obj.bypassWTD;
          this.bypassMTD = obj.bypassMTD;
        });
      }
    }
  }

  productivityForTeam(): void {
    const uids: UseridsVO = {};
    uids.userid = [];
    const msIdList: string[] = [];
    if (this.currentStatsSvc.teamMemberList) {
      this.currentStatsSvc.teamMemberList.forEach(member => {
        msIdList.push(member.msID);
      });
    }

    uids.userid = msIdList;
    if (!(uids === null || uids === undefined) && (uids.userid.length > 0)) {
      const obs: Observable<ProductivityVO> = this.bpmDashboardSvc.productivity(uids, uuid());
      if (obs) {
        this.progressSvc.forTag('dash-productivity').watch(obs).subscribe((obj: ProductivityVO) => {
          this.currentDayProcessed = obj.currentDay;
          this.weekToDateProcessed = obj.weekToDate;
          this.monthToDateProcessed = obj.monthToDate;
          this.bypassCD = obj.bypassCD;
          this.bypassWTD = obj.bypassWTD;
          this.bypassMTD = obj.bypassMTD;
        });
      }
    }
  }

  onChangeSelectedTeam(event: string): void {
    this.selectedTimeframe = 'Custom';
    this.isCustomTimeframe = true;
    this.customDateStart.setValue(this.dateToday);
    this.customDateEnd.setValue(this.dateToday);
    this.customDateStartParam = moment().format('YYYY-MM-DD');
    this.customDateEndParam = moment().format('YYYY-MM-DD');
    this.selectedUser = 'ALL';
    this.isIndividualSelected = false;

    this.selectedTeam = <string>event.valueOf();
    if (event === 'ALL') {
      this.selectedTeam = undefined;
    }
    const res = this.currentStatsSvc.fetchTeamMembers(this.selectedTeam, 500, 0);
    res.add(() => {
      this.productivityForTeam();
    });
    if (event === 'ALL') {
      this.selectedTeam = 'ALL';
    }

  }

  onChangeSelectedUser(event: string): void {
    this.selectedUser = <string>event.valueOf();

    if (this.selectedUser === 'ALL') {
      this.isIndividualSelected = false;
      this.productivityForTeam();
    } else {
      this.isIndividualSelected = true;
      this.productivity(this.currentStatsSvc.getIdFromName(this.selectedUser));
    }
  }

  onChangeSelectedTimeFrame(event: string): void {
    this.selectedTimeframe = event;
    this.isCustomTimeframe = false;

    if (this.selectedTimeframe === 'Custom') {
      this.isCustomTimeframe = true;
      this.customDateStartParam = moment().format('YYYY-MM-DD');
      this.customDateEndParam = moment().format('YYYY-MM-DD');
    } else {
      this.customDateStart.setValue(this.dateToday);
      this.customDateEnd.setValue(this.dateToday);
    }
  }

  onClickUpdateTimeFrame(): void {
    this.customDateStartParam = moment(this.customDateStart.value, 'MM/DD/YYYY').format('YYYY-MM-DD');
    this.customDateEndParam = moment(this.customDateEnd.value, 'MM/DD/YYYY').format('YYYY-MM-DD');
  }

  startDateValidator(ctl: AbstractControl): ValidationErrors | null {
    const minDate = moment().startOf('month').subtract(3, 'months');

    if (!moment(ctl.value, 'MM/DD/YYYY').isValid()) {
      const obj = {};
      obj['invalidStartDate'] = 'Please enter in MM/DD/YYYY format';
      return obj;
    }

    if (minDate > moment(ctl.value, 'MM/DD/YYYY')) {
      const obj = {};
      obj['invalidStartDate'] = 'Please enter in MM/DD/YYYY format';
      return obj;
    }

    return null;
  }

  endDateValidator(ctl: AbstractControl): ValidationErrors | null {
    const startDate = ctl.get('customDateStart');
    const endDate = ctl.get('customDateEnd');

    const startDateMoment = moment(startDate!.value, 'MM/DD/YYYY', true);
    const endDateMoment = moment(endDate!.value, 'MM/DD/YYYY', true);

    if (!endDateMoment.isValid() && endDate) {
      const obj = {};
      obj['invalidEndDate'] = 'Invalid End Date';
      endDate.setErrors(obj);
      return obj;
    } else if (startDateMoment.isAfter(endDateMoment) && endDate) {
      const obj = {};
      obj['invalidEndDate'] = 'Invalid End Date';
      endDate.setErrors(obj);
      return obj;
    } else if (endDate && !endDate.hasError('dateIsGreaterThanCurrentDate')) {
      endDate.setErrors(null);
    }

    return null;
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
    this.buttonClickedSubscription.unsubscribe();
  }
}
