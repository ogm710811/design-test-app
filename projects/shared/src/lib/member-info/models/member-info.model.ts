import { MemberInfoRow } from './member-info-table.model';

export class MemberInfoCard {
    name: string = '';
    memberNumber: string = '';
    addressInfoStreet: string = '';
    addressInfoCity: string = '';
    memberInfoRows: MemberInfoRow[] = [];
}
