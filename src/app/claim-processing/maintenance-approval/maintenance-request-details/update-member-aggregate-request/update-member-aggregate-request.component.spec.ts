import {DatePipe, TitleCasePipe} from '@angular/common';
import {Component, Directive, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDivider, MatSelectModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {ClaimHistoryApi} from '@fox/rest-clients';
import {
  claimProcessingRoutePathMaintenanceApproval,
  FieldTextFormatPipe,
  LinkDirective,
  LoadingOverlayComponent,
  MessageBoxService,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  ProgressContextService,
  SectionComponent,
  SectionService,
  TableHeaderSortComponent,
  WholeNumberFormatPipe
} from '@fox/shared';
import {HotkeyOptions, HotkeysService} from 'angular2-hotkeys';
import {of} from 'rxjs';
import {UpdateMemberAggregateRequestComponent} from './update-member-aggregate-request.component';
import {MemberInformationService} from '@fox/member-info';
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';

describe('UpdateMemberAggregateRequestComponent', () => {
  @Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[routerLink]'
  })
  class RouterLinkStubDirective {
    @Input() routerLink: string;
  }

  @Component({
    selector: 'fox-approve-deny-request',
    template: ''
  })
  class ApproveDenyRequestStubComponent {
    @Input() reqInfo: any;
    @Input() denialRsn: any;
    @Input() reviewTimeStmp: any;
    @Input() approverMsid: any;
    @Input() isPending: any;
    @Input() isApproved: any;
    @Input() isDeny: any;
    @Input() aggregatesUpdate: any;
  }

  let fixture: ComponentFixture<UpdateMemberAggregateRequestComponent>;
  let mockActivateRoute;
  let mockMemberSvc;
  let mockClmSvc;
  let mockTitlePipe;
  let mockMessgeBoxService;
  let mockRequestSvc;
  let mockHotKeyService;
  let mockHeaderSvc;
  let mockProgressContextService;

  const data = {
    memberDetails: {
      memberName: {
        firstName: 'El',
        lastName: 'Guapo'
      }
    }
  };

  const routeQueParams = {
    status: 'pending',
    memberNum: '12345',
    maintRequestId: '9998',
    denialReason: 'denialReason',
    reviewTimeStmp: '00/00/1999',
    approver: 'God'
  };

  const mainRequest = {
    '_embedded': {
      'items': [
        {
          'requesterMsid': 'foxtusr1t1',
          'maintAction': 'DED_AGGR_MAIN',
          'requestTimestamp': '2019-05-13 09:10 AM',
          'maintScreenDispValue': '{"payeeAggregate":{"difference":"100","oldValue":"350","newValue":"450"},"planYear":"2018","planSpecificAggregates":[{"plan":"X*","outOfPocketAggregates":[{"difference":"50","oldValue":"250","newValue":"300","effectiveDate":"2018-01-01"}],"drugBenefitAggregate":{"difference":"-100","oldValue":"1200","newValue":"1100"}},{"plan":"Y*","outOfPocketAggregates":[{"difference":"50","oldValue":"250","newValue":"300","effectiveDate":"2018-01-01"}],"drugBenefitAggregate":{"difference":"-100","oldValue":"1200","newValue":"1100"}},{"plan":"Z*","outOfPocketAggregates":[{"difference":"50","oldValue":"250","newValue":"300","effectiveDate":"2018-01-01"}],"drugBenefitAggregate":{"difference":"-100","oldValue":"1200","newValue":"1100"}}]}',
          'reqStatusCode': 'PENDING',
          'maintRequestUpdateDesc': '',
          'approverMsid': 'foxtusr1t1',
          'reviewedTimestamp': '2019-05-13 09:10 AM'
        }
      ]
    }
  };

  const parsedJson = [
    {
      'field': 'aarpPartBDeductible',
      'plan': 'M*',
      'planYear': 'Lifetime',
      'originalValue': '90.02',
      'newValue': '190.02'
    },
    {
      'field': 'medicareDeductibleRefund',
      'plan': 'Member',
      'planYear': '2018',
      'originalValue': '200',
      'newValue': '100'
    }
  ];

  beforeEach(() => {
    mockActivateRoute = {
      queryParams: of(routeQueParams)
    };
    mockMemberSvc = {
      getMemberByMemberNumber: jest.fn()
    };
    mockClmSvc = {
      getMaintRequest: jest.fn()
    };
    mockHeaderSvc = {
      getHeaderReq: jest.fn()
    };
    mockTitlePipe = {};
    mockMessgeBoxService = {};
    mockRequestSvc = {
      getRedirectUrl: jest.fn(),
      getStatusText: jest.fn()
    };
    mockHotKeyService = {};
    mockProgressContextService = {
      loadingCountChange: of('so')
    };

    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        NoopAnimationsModule
      ],
      declarations: [
        UpdateMemberAggregateRequestComponent,
        RouterLinkStubDirective,
        LoadingOverlayComponent,
        SectionComponent,
        MatDivider,
        LinkDirective,
        TableHeaderSortComponent,
        PaginatorNonMaterialComponent,
        ApproveDenyRequestStubComponent,
        WholeNumberFormatPipe,
        FieldTextFormatPipe
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivateRoute},
        {provide: MemberInformationService, useValue: mockMemberSvc},
        {provide: ClaimHistoryApi, useValue: mockClmSvc},
        {provide: TitleCasePipe, useValue: mockTitlePipe},
        {provide: MessageBoxService, useValue: mockMessgeBoxService},
        {provide: MaintenanceApprovalService, useValue: mockRequestSvc},
        {provide: PageHeaderService, useValue: mockHeaderSvc},
        {provide: ProgressContextService, useValue: mockProgressContextService},
        DatePipe,
        FieldTextFormatPipe,
        WholeNumberFormatPipe,
        SectionService,
        HotkeysService,
        {provide: HotkeyOptions, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(UpdateMemberAggregateRequestComponent);
    mockMemberSvc.getMemberByMemberNumber.mockReturnValue(of(data));
    mockClmSvc.getMaintRequest.mockReturnValue(of(mainRequest));
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should populate isPending with true', () => {
      const isPending = fixture.componentInstance.isPending;
      expect(isPending).toBeTruthy();
    });

    it('should populate first and last name of the member', () => {
      const htmlName = fixture.debugElement.queryAll(By.css('.content-note-4'));
      expect(htmlName[0].nativeElement.textContent).toContain(data.memberDetails.memberName.firstName);
      expect(htmlName[1].nativeElement.textContent).toContain(data.memberDetails.memberName.lastName);
    });

    it('should child component reqInfo property be populated with queryParams', () => {
      const approveDenyRequestComponent = fixture.debugElement.query(By.directive(ApproveDenyRequestStubComponent));
      expect(approveDenyRequestComponent.componentInstance.reqInfo).toEqual(routeQueParams);
    });

    it('should display planYear, Plan, field, originalValue and newValue', () => {
      const planYear = fixture.debugElement.queryAll(By.css('.col-header-year'));
      const plan = fixture.debugElement.queryAll(By.css('.col-header-plan'));
      const field = fixture.debugElement.queryAll(By.css('.col-header-field'));
      const originalValue = fixture.debugElement.queryAll(By.css('.col-header-original-val'));
      const newValue = fixture.debugElement.queryAll(By.css('.col-header-new-value'));
      expect(planYear[1].nativeElement.textContent).toEqual(parsedJson[0].planYear);
      expect(plan[1].nativeElement.textContent).toEqual(parsedJson[1].plan);
      expect(field[1].nativeElement.textContent).toEqual('Special Payee');
      expect(originalValue[1].nativeElement.textContent).toEqual('350');
      expect(newValue[1].nativeElement.textContent).toEqual('450');
      expect(planYear[2].nativeElement.textContent).toEqual(parsedJson[1].planYear);
      expect(field[2].nativeElement.textContent).toEqual('Drug Benefit Aggregate');
      expect(originalValue[2].nativeElement.textContent).toEqual('1200');
      expect(newValue[2].nativeElement.textContent).toEqual('1100');
    });
  });

  describe('route', () => {
    it('should the Back to search reusults have the correct route', () => {
      const routerLink = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective))[0].injector.get(RouterLinkStubDirective);
      expect(routerLink.routerLink).toEqual('../' + claimProcessingRoutePathMaintenanceApproval);
    });

    it('should arrpMembershipNum have the correct route', () => {
      mockRequestSvc.getRedirectUrl.mockReturnValue('hello');
      const routerLink = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective))[1].injector.get((RouterLinkStubDirective));
      fixture.componentInstance.getRedirectUrl('numberone', 'numbertwo');
      fixture.detectChanges();
      expect(routerLink.routerLink).toEqual('hello');
    });
  });

  it('should isDesc be changed, viewData populated when short method is called', () => {
    fixture.componentInstance.sort('plan');
    const originalValue = fixture.debugElement.queryAll(By.css('.col-header-original-val'))[1].nativeElement.textContent;
    fixture.detectChanges();
    expect(fixture.componentInstance.viewData[0].originalValue).toEqual('1200');
    expect(originalValue).toEqual('350');
    expect(fixture.componentInstance.isDesc).toBeTruthy();
    fixture.componentInstance.sort('plan');
    expect(fixture.componentInstance.isDesc).toBeFalsy();
  });
});
