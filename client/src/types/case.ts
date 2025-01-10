export type CaseStatus = 'active' | 'paralyzed' | 'closed';
export type CaseType = 'vehicle' | 'property' | 'appraisal';

interface BaseCase {
  id: string;
  internNumber: string;
  status: CaseStatus;
  record: string;
  plaintiff: string;
  defendant: string;
  type: string;
  court: string;
  lawOffice: string;
  debt: number;
  caseType: CaseType;
  movements: CaseMovement[];
  vehicleDetails?: VehicleCase;
  propertyDetails?: PropertyCase;
  appraisalDetails?: AppraisalCase;
}

interface VehicleCase extends BaseCase {
  // caseType: 'vehicle';
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  chassisBrand: string;
  chassisNumber: string;
  engineBrand: string;
  engineNumber: string;
}

interface PropertyCase extends BaseCase {
  // caseType: 'property';
  propertyRegistration: string;
  percentage: number;
  address: string;
  description: string;
  aps: Date;
  apsExpiresAt: Date;
  accountDgr: string;
  nomenclature: string;
}

interface AppraisalCase extends BaseCase {
  // caseType: 'appraisal';
  itemsToAppraise: string[];
  description: string;
}

export type Case = VehicleCase | PropertyCase | AppraisalCase;

export interface CaseMovement {
  id: string;
  caseInternNumber: string;
  description: string;
  createdAt: Date;
}
