import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'jsel';
import {Contingency} from "./contingency";
import LimitViolation = Contingency.LimitViolation;
import Remedial = Contingency.Remedial;

@Pipe({
  name: 'contingencies'
})
export class ContingenciesPipe implements PipeTransform {

  transform(data: any, args?: any): any {
    let result = new Array<Contingency>();

    // I- treatement pre contingencies
    let preContingencyResults = _(data).selectAll('//preContingencyResult');

    let preContingency = new Contingency("Contraintes_N");

    // retrieve limit violations
    let preLimitViolations = [].concat(..._(preContingencyResults).selectAll('//networkLimitViolationList'))
      .filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.subjectId === value.subjectId && t.limitType === value.limitType && t.acceptableDuration === value.acceptableDuration && t.side === value.side
        ))).sort();

    preContingency.limitViolations = new Array<Contingency.LimitViolation>();

    for (let preLimitViolation of preLimitViolations) {
      let preLimitViolation_ = new LimitViolation(preContingency);

      preLimitViolation_.subjectId = preLimitViolation.subjectId;
      preLimitViolation_.limitType = preLimitViolation.limitType;
      preLimitViolation_.acceptableDuration = preLimitViolation.acceptableDuration;
      preLimitViolation_.side = preLimitViolation.side;
      preLimitViolation_.limitValues = new Array<{ value: string, raw: any }>();

      //retrieve values
      for (let context of data) {
        let contextPreContingencyResult = _(context).selectAll('//preContingencyResult');

        let limitValueExist = false;

        let contextLimitViolations = [].concat(..._(contextPreContingencyResult).selectAll('//networkLimitViolationList'))
          .filter(value => value.subjectId === preLimitViolation_.subjectId && value.limitType === preLimitViolation_.limitType && value.acceptableDuration === preLimitViolation_.acceptableDuration && value.side === preLimitViolation_.side);

        for (let contextLimitViolation of contextLimitViolations) {
          let limitValue = contextLimitViolation.value / contextLimitViolation.limit
          preLimitViolation_.limitValues.push({
            value: limitValue == null ? null : Math.round(limitValue * 100) + "%",
            raw: contextLimitViolation
          });
          limitValueExist = true;
        }

        if (!limitValueExist) {
          preLimitViolation_.limitValues.push({value: null, raw: null});
        }
      }

      preContingency.limitViolations.push(preLimitViolation_);
    }

    // set rowspan for display of pre contingency
    preContingency.rowspan = preContingency.limitViolations.length;

    result.push(preContingency);


    // II- treatement post contingencies
    let postContingencyResults = [].concat(..._(data).selectAll('//postContingencyResults'));


    let contingencies = _(postContingencyResults).selectAll('//networkContingency');
    let contingencyNames = contingencies.map(item => item.id).filter((value, index, self) => self.indexOf(value) === index).sort();

    for (let contingencyName of contingencyNames) {
      let contingency = new Contingency(contingencyName);
      let contextPostContingencyResultsMap = new Map<any, any>()

      // retrieve limit violations
      let limitViolations = [].concat(..._(postContingencyResults.filter(value => value.networkContingency.id === contingencyName))
        .selectAll('//networkLimitViolationList'))
        .filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.subjectId === value.subjectId && t.limitType === value.limitType && t.acceptableDuration === value.acceptableDuration && t.side === value.side
          ))).sort();

      contingency.limitViolations = new Array<Contingency.LimitViolation>();

      for (let limitViolation of limitViolations) {
        let limitViolation_ = new LimitViolation(contingency);

        limitViolation_.subjectId = limitViolation.subjectId;
        limitViolation_.limitType = limitViolation.limitType;
        limitViolation_.acceptableDuration = limitViolation.acceptableDuration;
        limitViolation_.side = limitViolation.side;
        limitViolation_.limitValues = new Array<{ value: string, raw: any }>();

        // retrieve limit violation values
        for (let context of data) {
          let contextPostContingencyResults = [].concat(..._(context).selectAll('//postContingencyResults')).filter(value => value.networkContingency.id === contingencyName);
          contextPostContingencyResultsMap.set(context, contextPostContingencyResults);

          let limitValueExist = false;

          for (let contextPostContingencyResult of contextPostContingencyResults) {
            let contextLimitViolations = [].concat(..._(contextPostContingencyResult).selectAll('//networkLimitViolationList'))
              .filter(value => value.subjectId === limitViolation_.subjectId && value.limitType === limitViolation_.limitType && value.acceptableDuration === limitViolation_.acceptableDuration && value.side === limitViolation_.side);

            if (contextLimitViolations.length > 0) {
              let limitValue = contextLimitViolations[0].value / contextLimitViolations[0].limit
              limitViolation_.limitValues.push({
                value: limitValue == null ? null : Math.round(limitValue * 100) + "%",
                raw: contextLimitViolations[0]
              });
              limitValueExist = true;
              break;
            }
          }

          if (!limitValueExist) {
            limitViolation_.limitValues.push({value: null, raw: null});
          }
        }

        contingency.limitViolations.push(limitViolation_);
      }

      //retrieve remedials
      let remedials = [].concat(..._(postContingencyResults.filter(value => value.networkContingency.id === contingencyName))
        .selectAll('//remedials'))
        .filter((value, index, self) => self.map(mapObj => mapObj['name']).indexOf(value['name']) === index).sort();

      contingency.remedials = new Array<Contingency.Remedial>();

      for (let remedial of remedials) {
        let remedial_ = new Remedial(contingency);
        remedial_.name = remedial.name;
        remedial_.existence = new Array<{ value: boolean, raw: any }>();

        // retrieve remedial values
        for (let context of data) {
          let contextPostContingencyResults = contextPostContingencyResultsMap.get(context);

          let remedialExist = false;

          for (let contextPostContingencyResult of contextPostContingencyResults) {
            let contextRemedials = [].concat(..._(contextPostContingencyResult).selectAll('//remedials'))
              .filter(value => value.name === remedial_.name);

            if (contextRemedials.length > 0) {
              remedial_.existence.push({value: true, raw: contextRemedials[0]});
              remedialExist = true;
              break;
            }
          }

          if (!remedialExist) {
            remedial_.existence.push({value: null, raw: null})
          }
        }

        contingency.remedials.push(remedial_);
      }

      // set rowspan for display of post contingency
      contingency.rowspan = contingency.limitViolations.length + contingency.remedials.length;

      result.push(contingency);
    }

    return result;
  }

}
