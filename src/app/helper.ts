import * as moment from 'moment';

const PegaValorDaPropriedadeComDotNotation = (
    object,
    parameterStringDotNotation
  ) => {
    const arrayParameter = parameterStringDotNotation.split('.');
  
    for (let i = 0; i < arrayParameter.length; i++) {
      const candidate = object[arrayParameter[i]];
      // tslint:disable-next-line:curly
      if (!candidate) break;
      object = candidate;
    }
    return object;
};

const dataBancoParaDataTabela = (data) => {
  const dataTabela = moment(data, 'YYYY-MM-DD')

  if (dataTabela.isValid()) {
    return dataTabela.format('DD/MM/YYYY');
  }

  return '';
}

const pegaHorarioDaData = (data) => {
  return moment(data).format('HH:mm')
}

const convertDate = data => {
  const dataTabela = moment(data, 'YYYY-MM-DD')

  if (dataTabela.isValid()) {
    return dataTabela.format('DD/MM/YYYY - HH:MM:SS');
  }

  return '';
};

const moeda = (valor): number => {
  valor = numeroParaString(valor);
  valor = valor.replace(/[^0-9]/g, '');
  valor = valor.replace(/^(\d{1,})(\d{2})$/g, '$1,$2');
  valor = valor.replace(/(\d+)(\d{3},\d{2})$/g, '$1.$2');
  return valor;
}

const moedaBancoParaMoedaPt = (valor) => {
  valor = numeroParaString(valor);
  if (!valor.includes('.')) {
    valor = valor + ',00'
  }

  return moeda(valor);
}

function numeroParaString(valor: any) {
  if (!valor) {
    return '';
  }

  if (typeof valor === 'number') {
    valor = valor.toString();
  }

  return valor || '0';
}

const moedaParaDecimal = (moedaValue) => {
  let moedaCalculo = moedaValue.replace(/(\.)/g, '');
  moedaCalculo = moedaCalculo.replace(',', '.')
  return moedaCalculo;
}

export {
    moeda,
    convertDate,
    PegaValorDaPropriedadeComDotNotation,
    moedaParaDecimal,
    dataBancoParaDataTabela,
    pegaHorarioDaData,
    moedaBancoParaMoedaPt
}