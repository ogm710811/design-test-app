import {AddressVO} from '../../bpm-mediator/model/AddressVO';
import {MemberIdentifiersVO} from './MemberIdentifiersVO';
import {MemberVO} from '../../bpm-mediator/model/MemberVO';

export class SearchMemberVO {
  aarpMembershipNumber: MemberIdentifiersVO = new MemberIdentifiersVO();
  aarpAssociationId: MemberIdentifiersVO = new MemberIdentifiersVO();
  mdmRecordNumber: MemberIdentifiersVO = new MemberIdentifiersVO();
  memberName: MemberVO = new MemberVO();
  address: AddressVO = new AddressVO();
  addressType: string = '';
  fullAddress: AddressVO = new AddressVO();
  permanentAddress: AddressVO = new AddressVO();
  temporaryAddress: AddressVO = new AddressVO();
}
