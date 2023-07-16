import { arraysAreNotAllowedInProps } from '@ngrx/store/src/models';
import FileSaver from 'file-saver';
import { CBFunc, WorkBook, writeFileAsync, WritingOptions } from 'xlsx';

export async function saveAsExcelFile(buffer: any, fileName: string) {
  let EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE,
  });
  return FileSaver.saveAs(
    data,
    fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
  );
}

export async function exportObject2Excel(
  dados: { [key: string]: any } = {},
  filename: string,
  author?: string
) {
  return import('xlsx').then(async (xlsx) => {
    let workbook: any;

    const worksheets = Object.keys(dados).map((key) => ({
      key,
      worksheet: xlsx.utils.json_to_sheet(dados[key]),
    }));
    workbook = {
      Sheets: worksheets.reduce((m, v) => ({ ...m, [v.key]: v.worksheet }), {}),
      SheetNames: worksheets.map((w) => w.key),
    };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      Props: {
        Author: author ?? 'Caixa Econômica Federal',
        Title: 'Caixa Econômica Federal',
      },
    });
    await saveAsExcelFile(excelBuffer, filename);
    return true;
  });
}

export async function exportArray2Excel(
  dados: any[] = [],
  filename: string,
  author?: string
) {
  return import('xlsx').then(async (xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(dados);
    const workbook = { Sheets: { dados: worksheet }, SheetNames: ['dados'] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      Props: {
        Author: author ?? 'Caixa Econômica Federal',
        Title: 'Caixa Econômica Federal',
      },
    });
    await saveAsExcelFile(excelBuffer, filename);
    return true;
  });
}

export function writeFileXLSXAsync(
  filename: string,
  data: WorkBook,
  opts: WritingOptions
): Promise<void> {
  return new Promise((res, rej) => {
    try {
      writeFileAsync(filename, data, opts, () => {
        return res();
      });
    } catch (error) {
      rej(error);
    }
  });
}
