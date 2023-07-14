import { Item } from "src/app/shared/model/administrativo/ferramentas/Item";

export interface Favorito {
    id: number;
    item_id: number;
    matricula: string;
    item: Item
}