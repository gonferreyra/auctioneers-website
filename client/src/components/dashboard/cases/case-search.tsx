'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { cases } from '@/lib/data/cases';
// import type { Case } from "@/types/case";

export default function CaseSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'fileNumber' | 'party'>(
    'all',
  );

  const filteredCases = cases.filter((case_) => {
    const searchLower = searchTerm.toLowerCase();

    if (searchType === 'fileNumber') {
      return case_.recordNumber.toLowerCase().includes(searchLower);
    }

    if (searchType === 'party') {
      return (
        case_.plaintiff.toLowerCase().includes(searchLower) ||
        case_.defendant.toLowerCase().includes(searchLower)
      );
    }

    return (
      case_.recordNumber.toLowerCase().includes(searchLower) ||
      case_.title.toLowerCase().includes(searchLower) ||
      case_.plaintiff.toLowerCase().includes(searchLower) ||
      case_.defendant.toLowerCase().includes(searchLower)
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
                      {case_.recordNumber}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{case_.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {case_.plaintiff} vs {case_.defendant}
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
                      : case_.status === 'paralyzed'
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
