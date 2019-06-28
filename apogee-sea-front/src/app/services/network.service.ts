import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';
import {NewtworkbaseVoltage} from '../Models/newtworkbase-voltage';
import {Parade} from "../Models/Parade";


@Injectable()
export class NetworkService {

  constructor(private httpClient: HttpClient) {
  }

  getAllNewtworkbaseVoltage(): Observable<any> {
    return this.httpClient
      .get('/api/zones/networkBaseVoltages');
  }

  getNewtworkbaseVoltageById(id: string): Observable<any> {
    return this.httpClient.get('/api/zones/networkBaseVoltages' + '/' + id);
  }

  saveNewtworkbaseVoltage(newtworkbaseVoltage: NewtworkbaseVoltage): Observable<any> {
    return this.httpClient.post('/api/zones/networkBaseVoltages', newtworkbaseVoltage);
  }

  deleteNewtworkbaseVoltage(id: string): Observable<any> {
    return this.httpClient.delete('/api/zones/networkBaseVoltages' + '/' + id);
  }

  getAllNetworkContexts(): Observable<any> {
    return this.httpClient.get("/api/computation/context");
  }

  getZones(username: string): Observable<any> {
    return this.httpClient.get('/api/users/' + username + '/networkZones');
  }

  getTimerangeTypes(): Observable<any> {
    return this.httpClient.get('/api/config/timerangeTypes');
  }

  getContingencies(snapshotid: string, page: string, size: string, zones: string[], timerange: string, exclude: boolean): Observable<any> {
    let params = new HttpParams();

    params = params.append(`page`, page);
    params = params.append(`size`, size);
    params = params.append(`exclude`, String(exclude));
    params = params.append(`timerange`, encodeURIComponent(timerange));

    if (snapshotid) {
      params = params.append(`snapshotid`, snapshotid);
    }

    zones.forEach((zone: string) => {
      params = params.append(`zones`, encodeURIComponent(zone));
    })

    return this.httpClient.get("/api/computation/uisnapshot", {params: params});

  }

  getLimitViolations(snapshotid: string, contingencyid: string, contextList: string[], exclude: boolean): Observable<any> {
    let params = new HttpParams();
    params = params.append(`exclude`, String(exclude));
    contextList.forEach((contextId: string) => {
      params = params.append(`contextsId`, contextId);
    })
    let idContingencie: string = encodeURIComponent(contingencyid);
    return this.httpClient.get("/api/computation/uisnapshot/" + snapshotid + "?contingencyid=" + idContingencie + "", {params: params});

  }


  saveParade(remedial: Parade[]): Observable<any> {
    return this.httpClient.post('/api/remedial/prioritize', remedial);
  }

  getRemedials(contextId: string, contingencyid: string, networkDate: string): Observable<any> {
    let idContingencie: string = encodeURIComponent(contingencyid);
    return this.httpClient.get('/api/remedial/' + contextId + "?contingencyId=" + idContingencie + '&networkDate=' + networkDate);
  }

  getContingenciesPost(contingencyId: string, contextId: string): Observable<any> {
    let params = new HttpParams();

    params = params.append(`contingencyId`, contingencyId);
    params = params.append(`networkcontextId`, contextId);

    return this.httpClient.get('/api/zones/violations/networkVoltageLevels', {params: params});

  }

  refreshRemedials(idAfsRunner: string) {
    return this.httpClient.post('/api/remedial/refresh' + '?idAfsRunner=' + idAfsRunner, {});

  }

}
