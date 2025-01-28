export type CaseStatus = 'active' | 'paralyzed' | 'closed';
export type CaseType = 'vehicle' | 'property' | 'appraisal';

export interface BaseCase {
  id: number;
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
  // specificData: VehicleCase | PropertyCase | AppraisalCase;
  /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   * Puede ser VehicleCase, PropertyCase o AppraisalCase
   */
}

export type Case =
  | (BaseCase & { caseType: 'vehicle'; specificData: VehicleCase })
  | (BaseCase & { caseType: 'property'; specificData: PropertyCase })
  | (BaseCase & { caseType: 'appraisal'; specificData: AppraisalCase });

export interface VehicleCase {
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  chassisBrand: string;
  chassisNumber: string;
  engineBrand: string;
  engineNumber: string;
}

export interface PropertyCase {
  propertyRegistration: string;
  percentage: number;
  address: string;
  description: string;
  aps: Date;
  apsExpiresAt: Date;
  accountDgr: string;
  nomenclature: string;
}

export interface AppraisalCase {
  itemToAppraise: string[];
  description: string;
}

// export type Case = VehicleCase | PropertyCase | AppraisalCase;

export interface CaseMovement {
  id: string;
  caseInternNumber: string;
  description: string;
  createdAt: Date;
}
