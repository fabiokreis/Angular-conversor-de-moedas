import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Conversao, ConversaoResponse, Moeda } from '../models';
import { ConversorService, MoedaService } from '../services';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[];
  conversao: Conversao;
  possuiErro: boolean;
  conversaoResponse: ConversaoResponse;

  @ViewChild("conversaoForm") conversaoForm: NgForm;

  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService
  ) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodos();
    this.init();
  }

  init(): void {
    this.conversao = new Conversao('USD', 'BRL', null);
    this.possuiErro = false;
  }

  converter(): void {
    if (this.conversaoForm.form.valid) {
      this.conversorService.converter(this.conversao).subscribe((conversorResponse) => (this.tratarResponse(conversorResponse)));
    }
  }

  tratarResponse(response: any): void {
    if (response.success == true) {
      this.conversaoResponse = response
    } else {
      this.possuiErro = true
    }
  }

}
