import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MenuNivelEnum } from "../../../enum/menuNivelEnum";
import { UtilsProvider } from "../../../util/utils-provider";
import { MatExpansionPanel } from "@angular/material/expansion";
export class ItemMenuExpansivelComponent {
    constructor() {
        this.icone = '';
        this.nome = '';
        this.nivelItem = MenuNivelEnum.PRIMEIRO;
        this.callBack = new EventEmitter();
        this.classePainel = 'fechado';
    }
    ngOnChanges(changes) {
        UtilsProvider.ifChanged(changes.icone, (value) => {
            this.icone = value;
        });
        UtilsProvider.ifChanged(changes.nome, (value) => {
            this.nome = value;
        });
    }
    ngOnInit() {
    }
    definirClassePainel($event) {
        this.classePainel = $event ? 'aberto' : 'fechado';
    }
    tratarCallBack($event) {
        $event.stopPropagation();
        this.callBack.emit();
    }
    abrirPainel() {
        this.matExpanselPanel.open();
        if (!!this.referenciaSuperior) {
            this.referenciaSuperior.abrirPainel();
        }
    }
    fecharPainel() {
        this.matExpanselPanel.close();
    }
}
ItemMenuExpansivelComponent.decorators = [
    { type: Component, args: [{
                selector: 'item-menu-expansivel',
                template: "<mat-accordion [ngClass]=\"nivelItem\">\n  <mat-expansion-panel #panel  (expandedChange)='definirClassePainel($event)' >\n    <mat-expansion-panel-header [ngClass]=\"'item-expansion-panel ' + classePainel\">\n      <mat-panel-title>\n        <div class=\"titulo-item\">\n          <mat-icon class=\"icone\" *ngIf=\"!!icone\">{{icone}}</mat-icon>\n          <span class=\"texto\">{{nome}}</span>\n          <mat-icon class=\"expand-icon\">{{panel.expanded ?  'expand_less' : 'expand_more'}}</mat-icon>\n        </div>\n      </mat-panel-title>\n    </mat-expansion-panel-header>\n    <ng-content>\n    </ng-content>\n  </mat-expansion-panel>\n</mat-accordion>\n",
                styles: [".titulo-item{display:flex;flex-direction:row;align-items:center;width:100%}.titulo-item .icone{font-size:18px;width:18px;height:18px;margin-right:8px}.titulo-item .expand-icon{margin-left:auto}.aberto .texto{font-family:futuraHvBt,serif;line-height:140%;font-size:13px}.fechado .texto{font-family:futuraBkBt,serif;line-height:120%;font-size:13px}.primeiro .item-expansion-panel{background-color:#fff;color:#3a4859}.primeiro .aberto{border-bottom:1px solid #AFCACF}.primeiro .fechado{border-bottom:1px solid #F9FBFB}.primeiro .item-expansion-panel:focus-within{background-color:#e2f2ff;border:1px solid #005ca9;color:#005ca9}.primeiro .item-expansion-panel:active{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.primeiro .item-expansion-panel:active:focus-within{border:none;background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.primeiro .item-expansion-panel:hover{border:none;background-color:#eff4f5;border-bottom:1px solid #EFF4F5;color:#3a4859}.primeiro .item-expansion-panel:disabled{background-color:#fff;border-bottom:1px solid #F9FBFB;color:#8fb5bc}.segundo .item-expansion-panel{color:#3a4859}.segundo .fechado{background-color:#f9fbfb;border-bottom:1px solid #EFF4F5}.segundo .aberto{background-color:#fff;border-bottom:1px solid #AFCACF}.segundo .item-expansion-panel:focus-within{background-color:#e2f2ff;border:1px solid #005ca9;color:#005ca9}.segundo .item-expansion-panel:active{background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.segundo .item-expansion-panel:active:focus-within{border:none;background-color:#c6e5ff;border-bottom:1px solid #005ca9;color:#005ca9}.segundo .item-expansion-panel:hover{border:none;background-color:#d0e0e3;border-bottom:1px solid #d0e0e3;color:#3a4859}.segundo .item-expansion-panel:disabled{background-color:#f9fbfb;border-bottom:1px solid #EFF4F5;color:#8fb5bc}:host::ng-deep .primeiro .mat-expansion-panel-header-description,:host::ng-deep .primeiro .mat-expansion-panel-header-title{margin-right:0;padding:0 0 0 12px}:host::ng-deep .segundo .mat-expansion-panel-header-description,:host::ng-deep .segundo .mat-expansion-panel-header-title{margin-right:0;padding:0 0 0 32px}:host::ng-deep .mat-expansion-panel{box-shadow:none}:host::ng-deep .mat-expansion-panel-header{height:40px!important;padding:0 12px 0 0}:host::ng-deep .mat-expansion-indicator{display:none}:host ::ng-deep .mat-expansion-panel-body{padding:0}:host ::ng-deep .mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:unset;border-bottom-left-radius:unset}:host ::ng-deep .mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:unset;border-top-left-radius:unset}:host ::ng-deep .mat-expansion-panel{border-radius:unset}\n"]
            },] }
];
ItemMenuExpansivelComponent.ctorParameters = () => [];
ItemMenuExpansivelComponent.propDecorators = {
    icone: [{ type: Input }],
    nome: [{ type: Input }],
    nivelItem: [{ type: Input }],
    referenciaSuperior: [{ type: Input }],
    callBack: [{ type: Output }],
    matExpanselPanel: [{ type: ViewChild, args: [MatExpansionPanel, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tZW51LWV4cGFuc2l2ZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZHNjLWNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRlcy9kc2MtbWVudS1sYXRlcmFsL2l0ZW0tbWVudS1leHBhbnNpdmVsL2l0ZW0tbWVudS1leHBhbnNpdmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFPaEUsTUFBTSxPQUFPLDJCQUEyQjtJQXFCdEM7UUFuQkEsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUduQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBR2xCLGNBQVMsR0FBa0IsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQU1sRCxhQUFRLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFJeEQsaUJBQVksR0FBVyxTQUFTLENBQUM7SUFJakMsQ0FBQztJQUlELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUVILGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0lBRUQsbUJBQW1CLENBQUMsTUFBZTtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDckQsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFrQjtRQUMvQixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFaEMsQ0FBQzs7O1lBL0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxncUJBQW9EOzthQUVyRDs7OztvQkFFRSxLQUFLO21CQUdMLEtBQUs7d0JBR0wsS0FBSztpQ0FHTCxLQUFLO3VCQUdMLE1BQU07K0JBR04sU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1lbnVOaXZlbEVudW0gfSBmcm9tIFwiLi4vLi4vLi4vZW51bS9tZW51Tml2ZWxFbnVtXCI7XG5pbXBvcnQgeyBVdGlsc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWwvdXRpbHMtcHJvdmlkZXJcIjtcbmltcG9ydCB7IE1hdEV4cGFuc2lvblBhbmVsIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLW1lbnUtZXhwYW5zaXZlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pdGVtLW1lbnUtZXhwYW5zaXZlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2l0ZW0tbWVudS1leHBhbnNpdmVsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSXRlbU1lbnVFeHBhbnNpdmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICBpY29uZTogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgbm9tZTogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgbml2ZWxJdGVtOiBNZW51Tml2ZWxFbnVtID0gTWVudU5pdmVsRW51bS5QUklNRUlSTztcblxuICBASW5wdXQoKVxuICByZWZlcmVuY2lhU3VwZXJpb3I/OiBJdGVtTWVudUV4cGFuc2l2ZWxDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpXG4gIGNhbGxCYWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZChNYXRFeHBhbnNpb25QYW5lbCwge3N0YXRpYzogdHJ1ZX0pIG1hdEV4cGFuc2VsUGFuZWwhOiBNYXRFeHBhbnNpb25QYW5lbDtcblxuICBjbGFzc2VQYWluZWw6IHN0cmluZyA9ICdmZWNoYWRvJztcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBVdGlsc1Byb3ZpZGVyLmlmQ2hhbmdlZChjaGFuZ2VzLmljb25lLCAodmFsdWUpID0+IHtcbiAgICAgIHRoaXMuaWNvbmUgPSB2YWx1ZTtcbiAgICB9KTtcblxuICAgIFV0aWxzUHJvdmlkZXIuaWZDaGFuZ2VkKGNoYW5nZXMubm9tZSwgKHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLm5vbWUgPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbiAgZGVmaW5pckNsYXNzZVBhaW5lbCgkZXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmNsYXNzZVBhaW5lbCA9ICAkZXZlbnQgPyAnYWJlcnRvJyA6ICdmZWNoYWRvJztcbiAgfVxuXG4gIHRyYXRhckNhbGxCYWNrKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmNhbGxCYWNrLmVtaXQoKTtcbiAgfVxuXG4gIGFicmlyUGFpbmVsKCk6IHZvaWQge1xuICAgIHRoaXMubWF0RXhwYW5zZWxQYW5lbC5vcGVuKCk7XG4gICAgaWYgKCEhdGhpcy5yZWZlcmVuY2lhU3VwZXJpb3IpIHtcbiAgICAgIHRoaXMucmVmZXJlbmNpYVN1cGVyaW9yLmFicmlyUGFpbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgZmVjaGFyUGFpbmVsKCk6IHZvaWQge1xuICAgIHRoaXMubWF0RXhwYW5zZWxQYW5lbC5jbG9zZSgpO1xuXG4gIH1cblxuXG59XG4iXX0=