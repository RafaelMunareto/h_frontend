import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { PrimeIcons } from 'primeng/api';


@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.sass']
})
export class ExportExcelComponent implements OnInit {

  @Input() dados: any;
  @Input() nomeArquivo: any;
  @Input('SheetTittle') wrkTittle: string = 'Dados Exportados';
  @Input('SheetHeaders') wrkHeaders: any;
  @Input('tabelaHtml') htmlTable: string | null = '';

  btnPictureDisProd: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  exportExcel() {

    import("xlsx").then(xlsx => {
      this.enableDisBtn();
      var fullWs: any;

      const workSheet = xlsx.utils.json_to_sheet([{}]);
      const titleWs = xlsx.utils.sheet_add_json(workSheet, [{ title: this.wrkTittle }], { skipHeader: true, origin: 0 });

      if (this.htmlTable != '' && this.htmlTable != null) {

        var hTable: any = document.querySelector(`#${this.htmlTable} table`);
        var ndTable: any = document.querySelector(`#${this.htmlTable} .p-datatable-scrollable-body > table`);
        var fakeTable = document.createElement('table');

        for (let i = 0; i < hTable.rows.length; i++) {
          let nRow = fakeTable.insertRow();
          nRow.innerHTML = hTable.rows[i].innerHTML;
        }
        if (ndTable) {
          for (let i = 0; i < ndTable.rows.length; i++) {
            let nRow = fakeTable.insertRow();
            nRow.innerHTML = ndTable.rows[i].innerHTML;
          }
        }

        fullWs = xlsx.utils.table_to_sheet(fakeTable, { raw: true });

      } else {

        fullWs = xlsx.utils.sheet_add_json(titleWs, this.formatJson(this.dados), { skipHeader: false, origin: 2 });

      }

      const workbook = { Sheets: { 'Dados': fullWs }, SheetNames: ['Dados'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      this.saveAsExcelFile(excelBuffer, this.nomeArquivo);
      this.enableDisBtn();
    });

  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // @ts-ignore
    //import("file-saver").then(FileSaver => {

    var FileSaver = require('file-saver');
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //});
  }

  formatJson(dados: any[]) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    const formatterInteger = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    var objeto = ""
    var atributo = ""

    dados.map(res => {

      objeto = objeto + "{"

      Object.keys(res).forEach(function (key) {

        if (!isNaN(res[key])) {
          // Caso a informação seja um número verifica se tem parte da string
          if (key.toLowerCase().indexOf("uni") > -1
            || key.toLowerCase().indexOf("cod") > -1
            || key.toLowerCase().indexOf("cgc") > -1
            || key.toLowerCase().indexOf("nu_") > -1
            || key.toLowerCase().indexOf("am_ref") > -1
            || key.toLowerCase().indexOf("amref") > -1
            || key.toLowerCase().indexOf("ano_mes") > -1
            || key.toLowerCase().indexOf("porte") > -1
            || key.toLowerCase().indexOf("prazo") > -1
            || key.toLowerCase().indexOf("cpf") > -1
            || key.toLowerCase().substr(0, 2) == ("id")) {
            //Caso tenha parte dos caracteres acima fica sem formatacao
            atributo = `"${key}":"${res[key]}",`
          } else if (key.toLowerCase().indexOf("qtd") > -1) {
            // caso tenha parte dos caracteres acima vira inteiro
            atributo = `"${key}":"${formatterInteger.format(res[key])}",`
          } else {
            // caso contrário formata como nímero com separador de decimal e milhar
            atributo = `"${key}":"${formatter.format(res[key])}",`
          }
        } else {
          // Caso não seja um número, permanece com dados brutos sem formatação
          atributo = `"${key}":"${res[key]?.replace?.(/(\r\n|\n|\r)/gm, "").replace?.(/"/g, "").replace?.(/'/g, "")}",`
        }
        objeto = objeto + atributo
      });

      //Remoção da última vírgula
      objeto = objeto.slice(0, -1);
      objeto = objeto + "},"
      atributo = ""
    });

    //Remoção da última vírgula
    objeto = objeto.slice(0, -1);

    // retorno de um objeto Json com formação
    return JSON.parse("[" + objeto + "]");
  }

  enableDisBtn() {
    this.btnPictureDisProd = !this.btnPictureDisProd;
  }

}
