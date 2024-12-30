'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCasesPaginated } from '@/lib/api';
import { Case } from '@/types/case';

export default function CaseSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'fileNumber' | 'party'>(
    'all',
  );

  const { data, isLoading } = useQuery({
    queryKey: ['cases'],
    queryFn: () =>
      getCasesPaginated({
        page: 1,
        limit: 10,
        sortBy: 'recentMovement',
        sortOrder: 'desc',
      }),
    // ver la configuracion de cache, que me conviene mejor para este caso - Ahora tengo que actualizar la pagina para que haga otro request
    staleTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
    retry: false,
  });

  // debounce search term

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Buscar casos..."
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
            Todos
          </Button>
          <Button
            variant={searchType === 'fileNumber' ? 'default' : 'outline'}
            onClick={() => setSearchType('fileNumber')}
          >
            Numero Interno
          </Button>
          <Button
            variant={searchType === 'party' ? 'default' : 'outline'}
            onClick={() => setSearchType('party')}
          >
            Autos Catatulados
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="py-8 text-center text-muted-foreground">
            Cargando casos...
          </p>
        )}

        {data?.data.cases?.map((case_: Case) => (
          <Link key={case_.id} href={`/dashboard/cases/${case_.id}`}>
            <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {case_.intern_number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {case_.plaintiff} C/ {case_.defendant} - {case_.type} -{' '}
                    Expte Nro {case_.record}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {case_.plaintiff} vs {case_.defendant}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(case_.createdAt).toLocaleDateString()}
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

        {data?.data.cases?.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            No se encontraron casos que coincidan con sus criterios de búsqueda.
          </p>
        )}

        {!data && !isLoading && (
          <p className="py-8 text-center text-muted-foreground">
            {
              'Ocurrio un error al cargar los datos. Por favor, intente nuevamente.'
            }
          </p>
        )}
      </div>
    </div>
  );
}
