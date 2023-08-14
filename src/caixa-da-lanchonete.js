const produtos = [
   { codigo: 'cafe', valor: 3, descricao: 'Café' },
   { codigo: 'chantily', valor: 1.50, descricao: 'Chantily (extra do Café)', extraDe: 'cafe' },
   { codigo: 'suco', valor: 6.20, descricao: 'Suco Natural' },
   { codigo: 'sanduiche', valor: 6.50, descricao: 'Sanduíche' },
   { codigo: 'queijo', valor: 2, descricao: 'Queijo (extra do Sanduíche)', extraDe: 'sanduiche' },
   { codigo: 'salgado', valor: 7.25, descricao: 'Salgado' },
   { codigo: 'combo1', valor: 9.50, descricao: '1 Suco e 1 Sanduíche' },
   { codigo: 'combo2', valor: 7.50, descricao: '1 Café e 1 Sanduíche' }
]

function obtemCodigoItem(item) {
   return item.split(',')[0];
}
function obtemQuantidadeItens(item) {
   return Number(item.split(',')[1]);
}

function buscaProdutoPeloCodigo(codigo) {
   return produtos.find(produto => produto.codigo === codigo);
}

function buscaItemPrincipal(itens, codigo) {
   return itens.some(item => obtemCodigoItem(item) === codigo);
}

function formataValorTotal(valorTotal) {
   return valorTotal.toFixed(2).replace('.', ',');
}

function validaItem(item, itens) {
   const codigoDoItem = obtemCodigoItem(item);
   const quantidadeDeItens = obtemQuantidadeItens(item);

   if (quantidadeDeItens <= 0) throw 'Quantidade inválida!'

   const produto = buscaProdutoPeloCodigo(codigoDoItem);

   if (!produto) throw 'Item inválido!';

   if (produto.extraDe) {
      const possuiPrincipal = buscaItemPrincipal(itens, produto.extraDe);
      if (!possuiPrincipal) throw 'Item extra não pode ser pedido sem o principal';
   }
};


class CaixaDaLanchonete {

   calcularValorDaCompra(metodoDePagamento, itens) {
      try {
         if (metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'dinheiro') throw 'Forma de pagamento inválida!';
         if (!itens.length) throw 'Não há itens no carrinho de compra!';

         let valorTotal = 0;

         itens.forEach(item => {
            validaItem(item, itens);

            const produto = buscaProdutoPeloCodigo(obtemCodigoItem(item));
            const quantidadeDeItens = obtemQuantidadeItens(item);

            valorTotal += produto.valor * quantidadeDeItens;
         });

         if (metodoDePagamento === 'dinheiro') valorTotal -= (5 / 100) * valorTotal;
         if (metodoDePagamento === 'credito') valorTotal += (3 / 100) * valorTotal;

         const valorFormatado = formataValorTotal(valorTotal);

         return `R$ ${valorFormatado}`;

      } catch (error) {
         return error;
      }
   }
}

export { CaixaDaLanchonete };

