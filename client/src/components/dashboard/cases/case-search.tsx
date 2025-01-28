'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCasesPaginated } from '@/lib/api';
import type { Case } from '@/types/case';
import { useDebounce } from '@/lib/hooks';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CaseSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<
    'all' | 'recordNumber' | 'party'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState<
    'all' | 'vehicle' | 'property' | 'appraisal'
  >('all');

  const { data, isLoading, status, refetch } = useQuery({
    queryKey: ['cases'],
    queryFn: () =>
      getCasesPaginated({
        page: currentPage,
        limit: 10,
        sortBy: 'recentMovement',
        sortOrder: 'asc',
      }),
    // ver la configuracion de cache, que me conviene mejor para este caso - Ahora tengo que actualizar la pagina para que haga otro request
    staleTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
    retry: false,
  });

  const totalPages = data?.totalPages;

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // refetch on page change - server side pagination - I NEED TO MAKE A GLOBAL STATE TO HANDLE CURRENTPAGE SO IT DOESNT RESET WHEN I CHANGE THE PAGE
  useEffect(() => {
    if (!isLoading && data?.currentPage !== currentPage) refetch();
  }, [isLoading, data?.currentPage, currentPage, refetch]);

  // debounce search term

  const { debouncedValue, isDebounceLoading } = useDebounce(searchTerm, 1000);

  const filteredCases = data?.cases.filter((case_: Case) => {
    const searchLower = debouncedValue.toLowerCase();

    if (!debouncedValue) return true;

    if (type === 'vehicle') {
      return case_.caseType.includes('vehicle');
    } else if (type === 'property') {
      return case_.caseType.includes('property');
    } else if (type === 'appraisal') {
      return case_.caseType.includes('appraisal');
    }

    if (searchType === 'recordNumber') {
      return case_.record.toLowerCase().includes(searchLower);
    }

    if (searchType === 'party') {
      return (
        case_.plaintiff.toLowerCase().includes(searchLower) ||
        case_.defendant.toLowerCase().includes(searchLower)
      );
    }

    return (
      case_.record.toLowerCase().includes(searchLower) ||
      case_.type.toLowerCase().includes(searchLower) ||
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
            Todo
          </Button>
          <Select
            value={type}
            onValueChange={(
              value: 'all' | 'vehicle' | 'property' | 'appraisal',
            ) => setType(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Tipo de Juicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="vehicle">Rodados</SelectItem>
              <SelectItem value="property">Inmuebles</SelectItem>
              <SelectItem value="appraisal">Tasaciones</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={searchType === 'recordNumber' ? 'default' : 'outline'}
            onClick={() => setSearchType('recordNumber')}
          >
            Expediente
          </Button>
          <Button
            variant={searchType === 'party' ? 'default' : 'outline'}
            onClick={() => setSearchType('party')}
          >
            Autos Caratulados
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <p className="py-8 text-center text-muted-foreground">
            Cargando casos...
          </p>
        ) : searchTerm.length > 0 && isDebounceLoading ? (
          <p className="py-8 text-center text-muted-foreground">
            Buscando casos...
          </p>
        ) : (
          filteredCases?.map((case_: Case) => (
            <Link key={case_.id} href={`/dashboard/cases/${case_.id}`}>
              <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Expte. Nº {case_.record} - {case_.internNumber}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">
                      {case_.plaintiff} c/ {case_.defendant}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />

                        {case_.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />$
                        {case_.debt.toLocaleString()}
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
                    {case_.status.charAt(0).toUpperCase() +
                      case_.status.slice(1)}
                  </span>
                </div>
              </Card>
            </Link>
          ))
        )}

        {filteredCases?.length === 0 && !isLoading && !isDebounceLoading ? (
          <p className="py-8 text-center text-muted-foreground">
            No se encontraton registros con los datos proporcionados.
          </p>
        ) : (
          status === 'error' && (
            <p className="py-8 text-center text-muted-foreground">
              Error al cargar los casos.
            </p>
          )
        )}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageClick(currentPage - 1)}
                className={currentPage === 1 ? 'disabled' : ''}
              />
            </PaginationItem>
            {/* <PaginationItem> */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageClick(currentPage + 1)}
                className={currentPage === totalPages ? 'disabled' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
