import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversao, ConversaoResponse } from '../models';
import { ConversorService } from '../services';

@Component({
  selector: 'modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css']
})
export class ModalCotacaoComponent implements OnInit {

  @Input() id: string;
  @Input() conversaoReponse: ConversaoResponse;
  @Input() conversao: Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private conversorService: ConversorService) { }

  ngOnInit(): void {
  }

  novaConsulta() {
    this.onConfirm.emit();
  }

  get valorConvertido(): string {
    if (this.conversaoReponse === undefined) {
      return '0';
    }

    return (this.conversao.valor * this.conversaoReponse.rates[this.conversao.moedaPara]).toFixed(2);
  }

  get cotacaoPara(): number {
    return this.conversorService.cotacaoPara(this.conversaoReponse, this.conversao);
  }

  get cotacaoDe(): string {
    return this.conversorService.cotacaoDe(this.conversaoReponse, this.conversao);
  }

  get dataCotacao(): string {
    return this.conversorService.dataCotacao(this.conversaoReponse);
  }

}
