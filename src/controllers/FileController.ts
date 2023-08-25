import { Request, Response } from 'express';
import XLSX from 'xlsx';
import path from 'path';

const filePath = path.join(__dirname, '../../confirmation.xlsx');

class FileController {
  public async getData(_: Request, res: Response) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet);
    const parsedData = data.map((item: any) => ({
      ...item,
      companions: item?.companions
        ?.split(',')
        ?.map((item: any) => ({ name: item?.trim() })),
    }));
    return res.json(parsedData);
  }
}

export const fileController = new FileController();
