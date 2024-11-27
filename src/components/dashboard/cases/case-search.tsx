'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import type { Case } from '@/types/case';

// Mock data - Replace with actual API call
const cases: Case[] = [
  {
    id: '1',
    fileNumber: '2024-CV-001',
    title: 'Smith vs Johnson Property Dispute',
    parties: [
      { name: 'John Smith', role: 'plaintiff' },
      { name: 'Robert Johnson', role: 'defendant' },
    ],
    status: 'active',
    filingDate: '2024-01-15',
    court: 'District Court of Miami',
    judge: 'Hon. Sarah Williams',
    movements: [
      {
        id: 'm1',
        date: '2024-01-15',
        description: 'Initial filing',
        type: 'filing',
      },
    ],
  },
  {
    id: '2',
    fileNumber: '2024-CV-002',
    title: 'Martinez Estate Auction',
    parties: [
      { name: 'Elena Martinez', role: 'plaintiff' },
      { name: 'Carlos Rodriguez', role: 'defendant' },
    ],
    status: 'pending',
    filingDate: '2024-02-01',
    court: 'Circuit Court of Miami-Dade',
    movements: [
      {
        id: 'm2',
        date: '2024-02-01',
        description: 'Petition filed',
        type: 'filing',
      },
    ],
  },
];

export default function CaseSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'fileNumber' | 'party'>(
    'all',
  );

  const filteredCases = cases.filter((case_) => {
    const searchLower = searchTerm.toLowerCase();

    if (searchType === 'fileNumber') {
      return case_.fileNumber.toLowerCase().includes(searchLower);
    }

    if (searchType === 'party') {
      return case_.parties.some((party) =>
        party.name.toLowerCase().includes(searchLower),
      );
    }

    // Search all fields
    return (
      case_.fileNumber.toLowerCase().includes(searchLower) ||
      case_.title.toLowerCase().includes(searchLower) ||
      case_.parties.some((party) =>
        party.name.toLowerCase().includes(searchLower),
      )
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={searchType === 'all' ? 'default' : 'outline'}
            onClick={() => setSearchType('all')}
          >
            All
          </Button>
          <Button
            variant={searchType === 'fileNumber' ? 'default' : 'outline'}
            onClick={() => setSearchType('fileNumber')}
          >
            File Number
          </Button>
          <Button
            variant={searchType === 'party' ? 'default' : 'outline'}
            onClick={() => setSearchType('party')}
          >
            Party Name
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <Link key={case_.id} href={`/dashboard/cases/${case_.id}`}>
            <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {case_.fileNumber}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{case_.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {case_.parties.map((party) => party.name).join(' vs ')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(case_.filingDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-sm font-medium ${
                    case_.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : case_.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                </span>
              </div>
            </Card>
          </Link>
        ))}

        {filteredCases.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            No cases found matching your search criteria.
          </p>
        )}
      </div>
    </div>
  );
}
