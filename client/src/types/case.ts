// export interface Case {
//   id: string;
//   internalNumber: string; // Case number for organization inside auctioneers
//   recordNumber: string; // Official case record number
//   title: string; // e.g., "Banco suquia c/ Daniel blanco - Ejecucion hipotecaria"
//   status: 'active' | 'paralyzed' | 'closed' | 'pending';
//   court: string; // e.g., "Juzgado 1ra Instancia y 11 nominacion"
//   plaintiff: string; // Main plaintiff
//   defendant: string; // Main defendant
//   type: string; // Type of case (e.g., "Ejecucion hipotecaria")
//   filingDate: string;
//   notes?: string;
//   movements: CaseMovement[];
// }

export interface Case {
  id: number;
  intern_number: string;
  status: 'active' | 'paralyzed' | 'closed';
  record: string; // expte
  plaintiff: string; // actor
  defendant: string; // demandado
  type: string; // tipo de juicio
  court: string; // juzgado
  law_office?: string; // estudio
  debt?: number; // deuda
  aps?: Date; // fecha preventiva de subasta
  aps_expiresAt?: Date; // fecha caducidad preventiva
  is_executed: string; // que se ejecuta (matricula tanto, auto dominio tanto)
  address?: string; // domicilio
  account_dgr?: string; // cuenta dgr
  nomenclature?: string; // nomenclatura
  description?: string; // descripcion de lo que se ejecuta (matricula completa)
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseMovement {
  id: number;
  // case_id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
