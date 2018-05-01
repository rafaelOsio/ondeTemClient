import { Component, OnInit, EventEmitter } from '@angular/core';

import { Input, Output } from '@angular/core';
import { Table, Column } from './model/table';
import { PegaValorDaPropriedadeComDotNotation } from '../../helper';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  @Input() tableConfigurations: Table
  @Input() data: object[] = []

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  
  constructor() {
  }

  ngOnInit() {
  }

  resultRender(item, column) {
    
  }

  transformaObjetoNomeData(objeto, stringData) {
    return typeof PegaValorDaPropriedadeComDotNotation(objeto, stringData) !==
      'object'
      ? PegaValorDaPropriedadeComDotNotation(objeto, stringData)
      : '';
  }

  renderizaString(objeto: object, coluna: Column): string {
    if (coluna.config) {
      return this.configuraColuna(objeto, coluna);
    }
    return this.transformaObjetoNomeData(objeto, coluna.nameData);
  }

  configuraColuna(objeto, coluna: Column): string {
    if (coluna.config.mathValueToString) {
      const mathValueToString = coluna.config.mathValueToString;
      const resultColumn: string[] = mathValueToString.nameDatas.map(nameData =>
        this.transformaObjetoNomeData(objeto, nameData)
      );
      const resultMaths: string[] = [];

      mathValueToString.expected.forEach((valor, index) => {
        let indexForColumn = index;
        if (resultColumn.length === 1) {
          indexForColumn = 0;
        }

        if (valor === resultColumn[indexForColumn]) {
          resultMaths.push(mathValueToString.resultView[index]);
        }
      });

      if (resultMaths.length > 0) {
        if (mathValueToString.join) {
          return resultMaths.join(' / ');
        }
        return resultMaths[0];
      } else {
        return mathValueToString.default;
      }
    }

    if (coluna.config.idToView) {
      const idToView = coluna.config.idToView;
      const list = idToView.list;

      const filter = list.filter(elemento => {
        const id = this.transformaObjetoNomeData(elemento, idToView.idList);
        const valorAtual = this.transformaObjetoNomeData(
          objeto,
          idToView.idObject
        );

        if (id === valorAtual) {
          return true;
        }

        return false;
      })[0];

      return this.transformaObjetoNomeData(filter, idToView.nameData);
    }
  }

  deleteEvent(id) {
    this.delete.emit(id);
  }

  editEvent(id) {
    this.edit.emit(id);
  }

}
