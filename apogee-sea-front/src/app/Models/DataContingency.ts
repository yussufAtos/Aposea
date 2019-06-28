export class DataContingency {
  name: string;
  identifier: object;
  limitValues: any[];
  type: number;
  parent: string;
  numberCandidateRem: number;
  numberComputedRem: number;
  numberEfficientRem: number;

  constructor(name: string, identifier: object, limitValues: any[], type: number, parent: string, numberCandidateRem: number, numberComputedRem: number, numberEfficientRem: number) {
    this.name = name;
    this.identifier = identifier;
    this.limitValues = limitValues;
    this.type = type;
    this.parent = parent;
    this.numberCandidateRem = numberCandidateRem;
    this.numberComputedRem = numberComputedRem;
    this.numberEfficientRem = numberEfficientRem;
  }

}
