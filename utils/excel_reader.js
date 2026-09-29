import ExcelJS from 'exceljs';

export async function readExcelFile(filePath, worksheetIndex = 0) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[worksheetIndex];
  if (!worksheet) {
    throw new Error(`Worksheet index ${worksheetIndex} does not exist in ${filePath}`);
  }

  return worksheet;
}

export async function readExcelRows(filePath, worksheetIndex = 0) {
  const worksheet = await readExcelFile(filePath, worksheetIndex);
  return worksheet.getSheetValues();
}

export default {
  readExcelFile,
  readExcelRows,
};
