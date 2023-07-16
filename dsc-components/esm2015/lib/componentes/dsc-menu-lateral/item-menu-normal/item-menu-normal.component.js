import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MenuNivelEnum } from "../../../enum/menuNivelEnum";
import { UtilsProvider } from "../../../util/utils-provider";
export class ItemMenuNormalComponent {
    constructor() {
        this.icone = '';
        this.nome = '';
        this.nivelItem = MenuNivelEnum.PRIMEIRO;
        this.callBack = new EventEmitter();
        this.callBackItemSelecionado = new EventEmitter();
        this.isAtivo = false;
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        UtilsProvider.ifChanged(changes.rotaAtual, (value) => {
            this.rotaAtual = value;
            this.tratarRotaAtual();
        });
    }
    tratarCallBack($event) {
        $event.stopPropagation();
        this.callBack.emit();
        this.callBackItemSelecionado.emit();
    }
    tratarRotaAtual() {
        if (this.rotaAtual === this.urlPropria) {
            this.callBackItemSelecionado.emit();
            //TODO refatorar o setTimeOut
            //Tempo necessário para o matExpansel panel renderizar seu item filho
            setTimeout(() => {
                var _a;
                (_a = this.referenciaSuperior) === null || _a === void 0 ? void 0 : _a.abrirPainel();
            }, 650);
        }
    }
}
ItemMenuNormalComponent.decorators = [
    { type: Component, args: [{
                selector: 'item-menu-normal',
                template: "<div [ngClass]=\"nivelItem\" (click)=\"tratarCallBack($event)\" >\n  <div [ngClass]=\"isAtivo ? 'item-container ativo' : 'item-container'\" tabindex=\"0\">\n    <div class=\"item-title\">\n      <mat-icon class=\"icone\" *ngIf=\"nivelItem != 'terceiro' && !!icone\">{{icone}}</mat-icon>\n      <span class=\"texto\">{{nome}}</span>\n    </div>\n  </div>\n</div>\n\n",
                styles: [".item-container{display:flex;height:40px;cursor:pointer}.item-title{display:flex;flex-direction:row;align-items:center;width:100%}.item-title .icone{font-size:18px;width:18px;height:18px;margin-right:8px}.item-title .texto{font-family:futuraBkBt,serif;font-size:13px;line-height:120%}.primeiro .item-container{background-color:#fff;color:#3a4859;border-bottom:1px solid #F9FBFB}.primeiro .item-container .item-title{padding:12px}.primeiro .ativo{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.primeiro .item-container:focus{background-color:#e2f2ff;border:1px solid #005ca9;color:#005ca9;outline:none!important}.primeiro .item-container:active{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.primeiro .item-container:active:focus{border:none;background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.primeiro .item-container:hover{border:none;background-color:#eff4f5;border-bottom:1px solid #EFF4F5;color:#3a4859}.primeiro .item-container:disabled{background-color:#fff;border-bottom:1px solid #F9FBFB;color:#8fb5bc}.segundo .item-container{color:#3a4859;background-color:#f9fbfb;border-bottom:1px solid #EFF4F5}.segundo .item-container .item-title{padding:12px 12px 12px 32px}.segundo .ativo{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.segundo .item-container:focus{background-color:#e2f2ff;border:1px solid #005ca9;color:#005ca9;outline:none!important}.segundo .item-container:active{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.segundo .item-container:active:focus{border:none;background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.segundo .item-container:hover{border:none;background-color:#d0e0e3;border-bottom:1px solid #d0e0e3;color:#3a4859}.segundo .item-container:disabled{background-color:#f9fbfb;border-bottom:1px solid #EFF4F5;color:#8fb5bc}.terceiro .item-container{background-color:#eff4f5;border-bottom:0;color:#3a4859}.terceiro .item-container .item-title{padding:12px 12px 12px 52px}.terceiro .ativo{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.terceiro .item-container:focus{background-color:#e2f2ff;border:1px solid #005ca9;color:#005ca9;outline:none!important}.terceiro .item-container:active{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.terceiro .item-container:active:focus{border:none;background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.terceiro .item-container:hover{border:none;background-color:#d0e0e3;border-bottom:1px solid #d0e0e3;color:#3a4859}.terceiro .item-container:disabled{background-color:#eff4f5;border-bottom:0;color:#8fb5bc}\n"]
            },] }
];
ItemMenuNormalComponent.ctorParameters = () => [];
ItemMenuNormalComponent.propDecorators = {
    icone: [{ type: Input }],
    nome: [{ type: Input }],
    nivelItem: [{ type: Input }],
    rotaAtual: [{ type: Input }],
    urlPropria: [{ type: Input }],
    referenciaSuperior: [{ type: Input }],
    callBack: [{ type: Output }],
    callBackItemSelecionado: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tZW51LW5vcm1hbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kc2MtY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudGVzL2RzYy1tZW51LWxhdGVyYWwvaXRlbS1tZW51LW5vcm1hbC9pdGVtLW1lbnUtbm9ybWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVE3RCxNQUFNLE9BQU8sdUJBQXVCO0lBNkJsQztRQTFCQSxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBSW5CLFNBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsY0FBUyxHQUFrQixhQUFhLENBQUMsUUFBUSxDQUFDO1FBWWxELGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUd4RCw0QkFBdUIsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUV2RSxZQUFPLEdBQVksS0FBSyxDQUFDO0lBR3pCLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWtCO1FBQy9CLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQyw2QkFBNkI7WUFDN0IscUVBQXFFO1lBQ3JFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O2dCQUNkLE1BQUEsSUFBSSxDQUFDLGtCQUFrQiwwQ0FBRSxXQUFXLEVBQUUsQ0FBQztZQUN6QyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7U0FFUjtJQUNILENBQUM7OztZQS9ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIseVhBQWdEOzthQUVqRDs7OztvQkFHRSxLQUFLO21CQUlMLEtBQUs7d0JBR0wsS0FBSzt3QkFHTCxLQUFLO3lCQUdMLEtBQUs7aUNBR0wsS0FBSzt1QkFHTCxNQUFNO3NDQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTWVudU5pdmVsRW51bSB9IGZyb20gXCIuLi8uLi8uLi9lbnVtL21lbnVOaXZlbEVudW1cIjtcbmltcG9ydCB7IFV0aWxzUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbC91dGlscy1wcm92aWRlclwiO1xuaW1wb3J0IHsgSXRlbU1lbnVFeHBhbnNpdmVsQ29tcG9uZW50IH0gZnJvbSBcIi4uL2l0ZW0tbWVudS1leHBhbnNpdmVsL2l0ZW0tbWVudS1leHBhbnNpdmVsLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLW1lbnUtbm9ybWFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0tbWVudS1ub3JtYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pdGVtLW1lbnUtbm9ybWFsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSXRlbU1lbnVOb3JtYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgaWNvbmU6IHN0cmluZyA9ICcnO1xuXG5cbiAgQElucHV0KClcbiAgbm9tZTogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgbml2ZWxJdGVtOiBNZW51Tml2ZWxFbnVtID0gTWVudU5pdmVsRW51bS5QUklNRUlSTztcblxuICBASW5wdXQoKVxuICByb3RhQXR1YWwhOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdXJsUHJvcHJpYSE6IHN0cmluZztcblxuICBASW5wdXQoKVxuICByZWZlcmVuY2lhU3VwZXJpb3I/OiBJdGVtTWVudUV4cGFuc2l2ZWxDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpXG4gIGNhbGxCYWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQE91dHB1dCgpXG4gIGNhbGxCYWNrSXRlbVNlbGVjaW9uYWRvOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgaXNBdGl2bzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgVXRpbHNQcm92aWRlci5pZkNoYW5nZWQoY2hhbmdlcy5yb3RhQXR1YWwsICh2YWx1ZSkgPT4ge1xuICAgICAgdGhpcy5yb3RhQXR1YWwgPSB2YWx1ZTtcbiAgICAgIHRoaXMudHJhdGFyUm90YUF0dWFsKCk7XG4gICAgfSk7XG4gIH1cblxuICB0cmF0YXJDYWxsQmFjaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5jYWxsQmFjay5lbWl0KCk7XG4gICAgdGhpcy5jYWxsQmFja0l0ZW1TZWxlY2lvbmFkby5lbWl0KCk7XG4gIH1cblxuICB0cmF0YXJSb3RhQXR1YWwoKSB7XG4gICAgaWYgKHRoaXMucm90YUF0dWFsID09PSB0aGlzLnVybFByb3ByaWEpIHtcbiAgICAgIHRoaXMuY2FsbEJhY2tJdGVtU2VsZWNpb25hZG8uZW1pdCgpO1xuICAgICAgLy9UT0RPIHJlZmF0b3JhciBvIHNldFRpbWVPdXRcbiAgICAgIC8vVGVtcG8gbmVjZXNzw6FyaW8gcGFyYSBvIG1hdEV4cGFuc2VsIHBhbmVsIHJlbmRlcml6YXIgc2V1IGl0ZW0gZmlsaG9cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZmVyZW5jaWFTdXBlcmlvcj8uYWJyaXJQYWluZWwoKTtcbiAgICAgIH0sIDY1MClcblxuICAgIH1cbiAgfVxuXG59XG4iXX0=