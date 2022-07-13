import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class MatPaginatorIntlBrazilian extends MatPaginatorIntl {
    itemsPerPageLabel = 'Itens por página: ';
    nextPageLabel = 'Próxima Página';
    previousPageLabel = 'Página Anterior';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
    }
}