export class Context {
  caseCategory: string;
  caseType: string;
  computationDate: string;
  networkDate: string;
  insertionDate: string;
  execStatus: string;
  computationResultList: any[];

  constructor(caseType: string, caseCategory: string, computationDate: string, networkDate: string, insertionDate: string, execStatus: string, computationResultList: any[]) {
    this.caseCategory = caseCategory;
    this.caseType = caseType;
    this.computationDate = computationDate;
    this.networkDate = networkDate;
    this.insertionDate = insertionDate;
    this.computationResultList = computationResultList;
    this.execStatus = execStatus;
  }
}

