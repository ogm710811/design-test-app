import {ResourceOfDocumentVO} from '@fox/rest-clients';

export interface ResourceDocument extends ResourceOfDocumentVO {
  onQueue?: boolean;
  lockBadge?: boolean;
  wqStatusComplete?: boolean;
  queueName?: string;
  wqiBusinessId?: number;
}
