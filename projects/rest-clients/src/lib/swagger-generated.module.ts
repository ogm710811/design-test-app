import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialsApi} from './aces-mediator/MaterialsApi';
import {PreferenceApi} from './aces-mediator/PreferenceApi';
import {AuditApi} from './audit/AuditApi';
import {BypassApi} from './bpm-mediator/BypassApi';
import {DashboardApi} from './bpm-mediator/DashboardApi';
import {MemberValidationApi} from './bpm-mediator/MemberValidationApi';
import {OtherApi} from './bpm-mediator/OtherApi';
import {ClaimApi} from './claim-processing/ClaimApi';
import {ClaimHistoryApi} from './claim-processing/ClaimHistoryApi';
import {ClaimsMaterialApi as ClaimsClaimsMemberApi} from './claim-processing/ClaimsMaterialApi';
import {DuplicateCheckApi} from './claim-processing/DuplicateCheckApi';
import {ManualClaimApi} from './claim-processing/ManualClaimApi';
import {ReferencesApi} from './claim-processing/ReferencesApi';
import {TreasuryReconciliationApi} from './claim-processing/TreasuryReconciliationApi';
import {EligibilityUiApi} from './compas-mediator/EligibilityUiApi';
import {DocMetaApi} from './document/DocMetaApi';
import {DocumentManagementApi} from './document/DocumentManagementApi';
import {DocumentNotesApi} from './document/DocumentNotesApi';
import {DepositImagesService} from './excela-mediator/DepositImageApi';
import {BootstrapApi} from './fox-ui-services/BootstrapApi';
import {LetterWritingApi} from './letter-writing/LetterWritingApi';
import {ClaimsMemberApi} from './mdm-mediator/ClaimMemberApi';
import {MemberApi} from './mdm-mediator/MemberApi';
import {MemWithNineDigAcctNoApi} from './mdm-mediator/MemberWithNineDigitsAcctNoApi';
import {ProviderApi} from './mdm-mediator/ProviderApi';
import {OverpaymentRecoveryApi} from './overpayment-recovery/OverpaymentRecoveryApi';
import {ConfigteamApi} from './user/ConfigteamApi';
import {ConfiguserApi} from './user/ConfiguserApi';
import {WorkBenchApi} from './work-queue-management/WorkBenchApi';
import {WorkItemApi} from './work-queue-management/WorkItemApi';
import {WorkProcessApi} from './work-queue-management/WorkProcessApi';
import {WorkQueueApi} from './work-queue-management/WorkQueueApi';
import {WorkQueueReferencesApi} from './work-queue-management/WorkQueueReferencesApi';
import {WorkSessionApi} from './work-queue-management/WorkSessionApi';

@NgModule({})
export class SwaggerGeneratedModule {
}
