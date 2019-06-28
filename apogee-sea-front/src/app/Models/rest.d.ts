/* tslint:disable */
// Generated using typescript-generator version 2.11.472 on 2019-01-18 17:06:45.

export interface SnapshotResult {
    uiSnapshot: UiSnapshot;
    contingencies: ContingencyViolation[];
    networkContexts: NetworkContext[];
    preContingencyLimitViolations: LimitViolationByIdenfifier[];
    pageNumber: number;
    totalPages: number;
}

export interface LimitViolationByIdenfifierAndRemedials {
    violations: LimitViolationByIdenfifier[];
    candidatesRemedials: Remedial[][];
    remedialsResults: { [index: string]: LimitViolationByIdenfifier[] };
}

export interface UiSnapshot extends Serializable {
    id: number;
    createdDate: Date;
    uiSnapshotContingencyList: UiSnapshotContingency[];
}

export interface ContingencyViolation {
    contingencyId: string;
    violationStatus: any[];
}

export interface NetworkContext extends Serializable {
    id: number;
    caseType: CaseType;
    computationDate: Date;
    networkDate: Date;
    idAfsImportedCase: string;
    insertionDate: Date;
    computationResultList: AbstractComputationResult[];
}

export interface LimitViolationByIdenfifier {
    identifier: NetworkLimitViolationIdentifier;
    limitViolations: NetworkContextLimitViolation[];
}

export interface Remedial extends Serializable {
    idRemedialRepository: string;
    shortDescription: string;
}

export interface UiSnapshotContingency extends Serializable {
    id: number;
    uiSnapshot: UiSnapshot;
    networkContingency: NetworkContingency;
    uiSnapshotContingencyContextList: UiSnapshotContingencyContext[];
    networkZones: NetworkZone[];
}

export interface Serializable {
}

export interface CaseType extends Serializable {
    name: string;
    caseCategory: CaseCategory;
    enabled: boolean;
}

export interface AbstractComputationResult extends Serializable {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
    idAfsRunner: string;
    execStatus: ExecStatus;
}

export interface NetworkLimitViolationIdentifier extends Comparable<any> {
    subjectId: string;
    limitType: string;
    acceptableDuration: number;
    side: string;
}

export interface NetworkContextLimitViolation {
    contextId: number;
    limitViolation: NetworkLimitViolation;
}

export interface NetworkContingency extends Serializable {
    id: string;
    networkContingencyElementList: NetworkContingencyElement[];
    networkVoltageLevels: NetworkVoltageLevel[];
    postContingencyResults: NetworkPostContingencyResult[];
}

export interface UiSnapshotContingencyContext extends Serializable {
    id: number;
    status: Status;
    uiSnapshotContingency: UiSnapshotContingency;
    uiSnapshotContext: UiSnapshotContext;
}

export interface NetworkZone extends AbstractNetworkObject, Serializable {
    networkVoltageLevels: NetworkVoltageLevel[];
}

export interface CaseCategory extends Serializable {
    name: string;
    description: string;
    displayPriority: number;
    displayLimit: number;
    triggerUiSnapshot: boolean;
}

export interface Comparable<T> {
}

export interface NetworkLimitViolation extends Serializable {
    id: number;
    subjectId: string;
    limitType: string;
    limit: number;
    limitName: string;
    acceptableDuration: number;
    limitReduction: number;
    value: number;
    side: string;
    valueMw: number;
    preValue: number;
    preValueMw: number;
    networkLimitViolationsResult: NetworkLimitViolationsResult;
    networkVoltageLevels: NetworkVoltageLevel[];
}

export interface NetworkContingencyElement extends Serializable {
    id: number;
    equipmentName: string;
    contingencyElementType: ContingencyElementType;
    networkContingency: NetworkContingency;
}

export interface NetworkVoltageLevel extends AbstractNetworkObject, Serializable {
    baseVoltage: NetworkBaseVoltage;
}

export interface NetworkPostContingencyResult extends Serializable {
    id: number;
    networkContingency: NetworkContingency;
    networkLimitViolationsResult: NetworkLimitViolationsResult;
    remedials: Remedial[];
}

export interface UiSnapshotContext extends Serializable {
    id: number;
    uiSnapshot: UiSnapshot;
    networkContext: NetworkContext;
}

export interface AbstractNetworkObject extends Serializable {
    objectid: string;
    name: string;
}

export interface NetworkLimitViolationsResult extends Serializable {
    computationOk: boolean;
    networkLimitViolationList: NetworkLimitViolation[];
    networkPostContingencyResult: NetworkPostContingencyResult;
    actionsResults: NetworkActionResult[];
}

export interface NetworkBaseVoltage extends AbstractNetworkObject, Serializable {
    nominalVoltage: number;
}

export interface NetworkActionResult extends Serializable {
    id: number;
    networkLimitViolationsResult: NetworkLimitViolationsResult;
    variantResult: NetworkLimitViolationsResult;
    remedial: Remedial;
}

export type ExecStatus = "RUNNING" | "FAILED" | "COMPLETED" | "CREATED";

export type Status = "COMP_NOK" | "NO_VIOLATIONS" | "VIOLATIONS";

export type ContingencyElementType = "GENERATOR" | "BRANCH" | "HVDC_LINE" | "BUSBAR_SECTION";
