import { pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export const filterPesquisa = (pesquisa: string, dados: any[]) =>
  !pesquisa
    ? dados
    : dados.filter((item: any) =>
        (Object.keys(item) ?? []).some((col) => {
          return (item as any)[col]
            ?.toString()
            ?.toLowerCase()
            ?.includes(pesquisa);
        })
      );

export function debouncePesquisa(timeout = 700) {
  return pipe(
    debounceTime<string | undefined>(timeout),
    distinctUntilChanged<string | undefined>(),
    map((val?: string) => (val || '').toLowerCase())
  );
}
