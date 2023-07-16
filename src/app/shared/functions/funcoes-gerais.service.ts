import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Injectable({
  providedIn: 'root',
})
export class FuncoesGeraisService {
  constructor(private messageService: MessageService) {}

  public customSort(event: any) {
    event.data.sort(
      (data1: { [x: string]: any }, data2: { [x: string]: any }) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        const numero = ['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let matches1 =
          /((\d{4})[-.\/](\d{2})[-.\/](\d{2}))|((\d{2})[-.\/](\d{2})[-.\/](\d{4}))/.test(
            value1
          );
        let matches2 =
          /((\d{4})[-.\/](\d{2})[-.\/](\d{2}))|((\d{2})[-.\/](\d{2})[-.\/](\d{4}))/.test(
            value2
          );

        if (value1 !== null && typeof value1 != 'undefined') {
          if (matches1) {
            value1 = new Date(value1);
          } else if (typeof value1 == 'number') {
            value1 = value1;
          } else if (numero.indexOf(value1[0]) !== -1) {
            value1 = parseFloat(value1);
          } else {
            value1 = value1.toString();
          }
        }

        if (value2 !== null && typeof value2 != 'undefined') {
          if (matches2) {
            value2 = new Date(value2);
          } else if (typeof value2 == 'number') {
            value2 = value2;
          } else if (numero.indexOf(value2[0]) !== -1) {
            value2 = parseFloat(value2);
          } else {
            value2 = value2.toString();
          }
        }

        // if(matches1 && matches2){
        //   value1 = new Date(value1);
        //   value2 = new Date(value2);
        // }else if(numero.indexOf(value1[0]) !== -1){
        //   value1 = parseFloat(value1)
        //   value2 = parseFloat(value2)
        // }else{
        //   value1 = value1.toString()
        //   value2 = value2.toString()
        // }

        if (value1 == null && value2 != null) {
          result = -1;
        } else if (value1 != null && value2 == null) {
          result = 1;
        } else if (value1 == null && value2 == null) {
          result = 0;
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          result = value1.localeCompare(value2);
        } else if (value1 instanceof Date && value2 instanceof Date) {
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        } else {
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        }

        return event.order * result;
      }
    );
  }

  applyFilterGlobal($event: Event, dt: Table) {
    dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  public actionsForSuccess(titulo: any, msg: any) {
    this.messageService.add({
      severity: 'success',
      summary: titulo,
      detail: msg,
    });
  }

  public actionsForError(titulo: any, msg_error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro!',
      detail: msg_error,
    });
    console.log('Aconteceu um erro', msg_error);
  }

  public actionsForCustom(
    titulo: any,
    msg_error: any,
    severity: string = 'info',
    tempo: number = 3000
  ) {
    this.messageService.add({
      severity: severity,
      summary: titulo,
      detail: msg_error,
      life: tempo,
    });
    console.log('Aconteceu um erro', msg_error);
  }

  public showToastSuccess(params: { title?: string; msg: string }): void {
    const { title = 'Sucesso', msg } = params;
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: msg,
    });
  }

  public showToastError(params: { title?: string; msg?: string } = {}): void {
    const { title = 'Erro', msg = 'Ocorreu um erro.' } = params;
    this.messageService.add({ severity: 'error', summary: title, detail: msg });
  }

  public parseColor(val: any, isCard: boolean = true) {
    const cmpVal = parseFloat(val);
    if (cmpVal >= 100) {
      return isCard ? 'blue' : '#0861acff';
    } else if (cmpVal >= 95 && cmpVal < 100) {
      return isCard ? 'green' : '#61a03cff';
    } else if (cmpVal >= 90 && cmpVal < 95) {
      return isCard ? 'yellow' : '#e29a0aff';
    } else {
      return isCard ? 'red' : '#ca5353';
    }
  }

  public colorConquiste(val: any) {
    const cmpVal = parseFloat(val);
    if (cmpVal >= 100) {
      return 'blue';
    } else if (cmpVal >= 95 && cmpVal < 100) {
      return 'green';
    } else if (cmpVal >= 90 && cmpVal < 95) {
      return '#F9B000';
    } else {
      return 'red';
    }
  }

  public colorTDV(val: any) {
    const cmpVal = parseFloat(val);
    if (cmpVal >= 40) {
      return 'black';
    } else if (cmpVal >= 30 && cmpVal < 40) {
      return 'bronze';
    } else if (cmpVal < 30) {
      return 'grey';
    } else {
      return 'grey';
    }
  }

  public parseColorProgessBar(val: any, isCard: boolean = true) {
    const cmpVal = parseFloat(val);
    if (cmpVal >= 100) {
      return isCard ? 'blue_bar' : '#0861acff';
    } else if (cmpVal >= 95 && cmpVal < 100) {
      return isCard ? 'green_bar' : '#61a03cff';
    } else if (cmpVal >= 90 && cmpVal < 95) {
      return isCard ? 'yellow_bar' : '#e29a0aff';
    } else {
      return isCard ? 'red_bar' : '#EFEFEF';
    }
  }

  public parseColorSprint(val: any) {
    const cmpVal = parseFloat(val);
    if (cmpVal > 0) {
      return 'blue';
    } else {
      return 'red';
    }
  }

  public convertToFloat2(dados: any) {
    if (!dados) {
      return 0.0;
    }
    return Math.round(dados * 100) / 100;
  }

  removerDuplicados(obj: any) {
    let dados = [
      ...new Set(
        obj.map((c: any) => {
          return JSON.stringify(c);
        })
      ),
    ].map((d: any) => {
      return JSON.parse(d);
    });
    return dados;
  }

  downloadExcel(
    dados: any[],
    nomeArquivo: string,
    wrkTittle: string = '',
    sheetName: string = 'Dados'
  ) {
    const EXCEL_EXTENSION = '.xlsx';
    import('xlsx').then((xlsx) => {
      var fullWs: any;
      const workSheet = xlsx.utils.json_to_sheet([{}]);
      const titleWs = xlsx.utils.sheet_add_json(
        workSheet,
        [{ title: wrkTittle }],
        { skipHeader: true, origin: 0 }
      );

      fullWs = xlsx.utils.sheet_add_json(titleWs, dados, {
        skipHeader: false,
        origin: wrkTittle ? 2 : 0,
      });

      const workbook = { Sheets: { Dados: fullWs }, SheetNames: [sheetName] };
      xlsx.writeFile(
        workbook,
        nomeArquivo + '_export_' + new Date().getTime() + EXCEL_EXTENSION,
        {
          bookType: 'xlsx',
          type: 'array',
        }
      );
    });
  }

  primeiraMaiusculaEmCadaPalavra(
    texto: string,
    separador: string = ' '
  ): string {
    if (!texto) {
      return '';
    }
    return texto
      .split(separador)
      .map(
        (token: string) =>
          token.charAt(0).toUpperCase() + token.slice(1).toLowerCase()
      )
      .join(' ');
  }

  tranformaAnoMesEmMesExtenso(anomes: any) {
    anomes = anomes.toString().substring(4, 6);
    switch (anomes) {
      case '01':
        return 'Janeiro';
      case '02':
        return 'Fevereiro';
      case '03':
        return 'Março';
      case '04':
        return 'Abril';
      case '05':
        return 'Maio';
      case '06':
        return 'Junho';
      case '07':
        return 'Julho';
      case '08':
        return 'Agosto';
      case '09':
        return 'Setembro';
      case '10':
        return 'Outubro';
      case '11':
        return 'Novembro';
      case '12':
        return 'Dezembro';
      default:
        return '';
    }
  }

  converterAnoMesParaTexto(anoMes: number) {
    const ano = anoMes.toString().substring(0, 4);
    const mesExtenso = this.tranformaAnoMesEmMesExtenso(anoMes);
    return `${mesExtenso} / ${ano}`;
  }

}
