import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IContact } from 'app/shared/model/contact.model';

type EntityResponseType = HttpResponse<IContact>;
type EntityArrayResponseType = HttpResponse<IContact[]>;

@Injectable({ providedIn: 'root' })
export class ContactService {
  public resourceUrl = SERVER_API_URL + 'api/contacts';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/contacts';

  constructor(protected http: HttpClient) {}

  create(contact: IContact): Observable<EntityResponseType> {
    return this.http.post<IContact>(this.resourceUrl, contact, { observe: 'response' });
  }

  update(contact: IContact): Observable<EntityResponseType> {
    return this.http.put<IContact>(this.resourceUrl, contact, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContact[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContact[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}