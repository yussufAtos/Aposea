export class Contingency {
  name: string;

  limitViolations: Array<Contingency.LimitViolation>;

  remedials: Array<Contingency.Remedial>;

  rowspan: number;

  constructor(name: string) {
    this.name = name;
    this.limitViolations = null;
    this.remedials = null;
    this.rowspan = null;
  }
}

Contingency["__class"] = "SecurityAnalysisTableResult.Contingency";


export namespace Contingency {

  export class LimitViolation {
    public __parent: any;
    subjectId: string;
    limitType: string;
    acceptableDuration: number;
    side: string;
    limitValues: Array<{ value: string, raw: any }>;

    constructor(__parent: any) {
      this.__parent = __parent;
      this.subjectId = null;
      this.limitType = null;
      this.acceptableDuration = null;
      this.side = null;
      this.limitValues = null;
    }
  }

  export class Remedial {
    public _parent: any;
    name: string;
    existence: Array<{ value: boolean, raw: any }>;

    constructor(__parent: any) {
      this._parent = __parent;
      this.name = null;
      this.existence = null;
    }

  }

  LimitViolation["__class"] = "SecurityAnalysisTableResult.Contingency.LimitViolation";

}
