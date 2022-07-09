import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conversao, ConversaoResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly BASE_URL = "https://api.apilayer.com/fixer/latest?apikey=tfRdBYC2TjIatr1P560z8w8ZTLtvtymf";

  constructor(private http: HttpClient) { }

  converter(conversao: Conversao): Observable<ConversaoResponse> {
    let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;

    return this.http
      .get<ConversaoResponse>(this.BASE_URL + params);
  }

  cotacaoPara(conversaoResponse: ConversaoResponse, 
		conversao: Conversao): number {
  	if (conversaoResponse === undefined) {
  		return 0;
  	}

  	return conversaoResponse.rates[conversao.moedaPara];
  }

  cotacaoDe(conversaoResponse: ConversaoResponse, 
		conversao: Conversao): string {
  	if (conversaoResponse === undefined) {
  		return '0';
  	}

  	return (1 / conversaoResponse.rates[conversao.moedaPara])
  		.toFixed(4);
  }

  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }

    return conversaoResponse.date;
  }
}
