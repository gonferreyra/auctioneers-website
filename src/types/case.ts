export interface Case {
  id: string;
  internalNumber: string; // Case number for organization inside auctioneers
  recordNumber: string; // Official case record number
  title: string; // e.g., "Banco suquia c/ Daniel blanco - Ejecucion hipotecaria"
  status: 'active' | 'paralyzed' | 'closed';
  court: string; // e.g., "Juzgado 1ra Instancia y 11 nominacion"
  plaintiff: string; // Main plaintiff
  defendant: string; // Main defendant
  type: string; // Type of case (e.g., "Ejecucion hipotecaria")
  filingDate: string;
  notes?: string;
  movements: CaseMovement[];
}

export interface CaseMovement {
  id: string;
  date: string;
  description: string;
  type: 'filing' | 'hearing' | 'motion' | 'decision' | 'other';
}
