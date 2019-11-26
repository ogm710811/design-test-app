import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemberInfoCard, MemberInfoRow, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {Rpdmb80} from './model/rpdmb80.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyRvwRvldCauti::qltyRvwRvldCauti::qltyRvwRvldCauti
 */
@Component({
  selector: 'fox-revalidation-cautions',
  templateUrl: './revalidation-cautions.component.html',
  styleUrls: ['./revalidation-cautions.component.css']
})
export class RevalidationCautionsComponent implements OnInit {
  screenBean = new Rpdmb80();
  container = new Container();
  cautiNotes: Array<any> = [];
  resultData: Array<any> = [];
  tableData: any;
  headerColumn = ['Caution Code', 'Caution Message'];
  planFull = [this.screenBean.m80pln1, this.screenBean.m80pln2, this.screenBean.m80pln3, this.screenBean.m80pln4, this.screenBean.m80pln5];
  plan: string[] = [];
  term: string[] = [];
  memberInfo: MemberInfoCard = new MemberInfoCard();

  plans: { planCode: string, dates?: string, reasonCode?: string }[] = [
    {planCode: 'A01', dates: '01/01/2018 - ', reasonCode: 'EF3'},
    {planCode: 'A02', dates: '01/01/2018 - 02/01/2018', reasonCode: 'EF3'}
  ];

  public constructor(protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService) {

  }
  /**
   * On Load Action
   */
  ngOnInit(): void {

    let data: any = undefined;
    let dfhcommarea;
    let oprec1Record;
    let qualityInfoRecord;
    let qualityCommAreaFieldsFor06o75;
    this.container = new Container();

    data = this.transferSrv.getData();
    dfhcommarea = data['dfhCommArea'];
    oprec1Record = data['oprec1Record'];
    qualityInfoRecord = data['qualityInfoRecord'];
    qualityCommAreaFieldsFor06o75 = data['qualityCommAreaFieldsFor06o75'];

    this.container.dfhcommarea = dfhcommarea;
    this.container.workStorage.oprec1Record = oprec1Record;
    this.container.workStorage.qualityInfoRecord = qualityInfoRecord;
    this.container.workStorage.qualityCommAreaFieldsFor06o75 = qualityCommAreaFieldsFor06o75;
    this.qltyRvwRvldCautiServiceMain(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      this.screenBean.m80pln1 = this.screenBean.m80pln1.trim();
      this.memberInfo = this.buildMemberInfo(this.screenBean);

      if (this.screenBean) {
        if (this.screenBean.m80cau1 !== '') {
          this.cautiNotes[0] = this.screenBean.m80cau1;
        }
        if (this.screenBean.m80cau2 !== '') {
          this.cautiNotes[1] = this.screenBean.m80cau2;
        }
        if (this.screenBean.m80cau3 !== '') {
          this.cautiNotes[2] = this.screenBean.m80cau3;
        }
        if (this.screenBean.m80cau4 !== '') {
          this.cautiNotes[3] = this.screenBean.m80cau4;
        }
        if (this.screenBean.m80cau5 !== '') {
          this.cautiNotes[4] = this.screenBean.m80cau5;
        }
        if (this.screenBean.m80cau6 !== '') {
          this.cautiNotes[5] = this.screenBean.m80cau6;
        }
        if (this.screenBean.m80cau7 !== '') {
          this.cautiNotes[6] = this.screenBean.m80cau7;
        }
        if (this.screenBean.m80cau8 !== '') {
          this.cautiNotes[7] = this.screenBean.m80cau8;
        }
        if (this.screenBean.m80cau9 !== '') {
          this.cautiNotes[8] = this.screenBean.m80cau9;
        }
        if (this.screenBean.m80cau0 !== '') {
          this.cautiNotes[9] = this.screenBean.m80cau0;
        }
      }

      this.cautiNotes.forEach(note => {
        if (note) {
          this.tableData = note.split(') ');
          this.resultData.push({'Caution Code': this.tableData[0], 'Caution Message': this.tableData[1]});
        }
      });
    });
  }

  buildMemberInfo(resp: Rpdmb80): MemberInfoCard {

    const memberInfo: MemberInfoCard = new MemberInfoCard();
    const row: MemberInfoRow = new MemberInfoRow();
    memberInfo.memberNumber = resp.m80acct;
    memberInfo.addressInfoStreet = resp.m80ins2;
    memberInfo.addressInfoCity = resp.m80ins3;
    memberInfo.name = resp.m80ins1;
    memberInfo.memberInfoRows = [];

    if (resp.m80pln1) {
      row.planCode = resp.m80pln1;
      memberInfo.memberInfoRows.push(row);
    }
    if (resp.m80pln2) {
      row.planCode = resp.m80pln2;
      memberInfo.memberInfoRows.push(row);
    }
    if (resp.m80pln3) {
      row.planCode = resp.m80pln3;
      memberInfo.memberInfoRows.push(row);
    }
    if (resp.m80pln4) {
      row.planCode = resp.m80pln4;
      memberInfo.memberInfoRows.push(row);
    }
    if (resp.m80pln5) {
      row.planCode = resp.m80pln5;
      memberInfo.memberInfoRows.push(row);
    }

    memberInfo.memberInfoRows = this.plans;
    return memberInfo;
  }

  splitPlan(): void {
    for (let index = 0; index <= this.planFull.length; index++) {
      const splt = this.planFull[index].split(' ');
      this.plan[index] = splt[0];
      this.term[index] = splt[1];
    }
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldCautiServiceShowFreshMap(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldCautiServiceMainRun(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      this.pushAlert(this.screenBean.m80err);
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldCautiServiceTransferToRpd06o76(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      if (this.container.redirectTo === 'RPD06O76') {
        this.transferSrv.set('dfhCommArea', this.container.dfhcommarea);
        this.transferSrv.set('oprec1Record', this.container.workStorage.oprec1Record);
        this.router.navigate(['/quality-review/quality-misc-info']);
      }
    });

  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Quality Review Cautions', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls mainRun
   */
  private qltyRvwRvldCautiServiceMainRun(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldcauti/qltyrvwrvldcautiservice/mainrun', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private qltyRvwRvldCautiServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldcauti/qltyrvwrvldcautiservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls invalidKey
   */
  private qltyRvwRvldCautiServiceInvalidKey(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldcauti/qltyrvwrvldcautiservice/invalidkey', JSON.stringify(container), options);

  }

  /**
   * Back end calls main
   */
  private qltyRvwRvldCautiServiceMain(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldcauti/qltyrvwrvldcautiservice/main', JSON.stringify(container), options);

  }

  /**
   * Back end calls transferToRpd06o76
   */
  private qltyRvwRvldCautiServiceTransferToRpd06o76(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldcauti/qltyrvwrvldcautiservice/transfertorpd06o76', JSON.stringify(container), options);

  }
}
