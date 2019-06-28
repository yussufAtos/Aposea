export class Parade {
  networkContingency: object;
  prioritizeStartDate: string;
  prioritizeEndDate: string;
  prioritizeRemedialList: any[];

  constructor(networkContingency: object, prioritizeStartDate: string, prioritizeEndDate: string, prioritizeRemedialList: any[]) {
    this.networkContingency = networkContingency;
    this.prioritizeStartDate = prioritizeStartDate;
    this.prioritizeEndDate = prioritizeEndDate;
    this.prioritizeRemedialList = prioritizeRemedialList;
  }
}
