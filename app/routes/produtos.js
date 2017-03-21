
module.exports = function(app) {
  var listaProdutos = function(req,res){
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.lista(function(erros,resultados){
      res.format({
          html: function(){
              res.render('produtos/lista',{lista:resultados});
          },
          json: function(){
              res.json(resultados)
          }
      });

  });
    connection.end();
};


app.get('/produtos',listaProdutos);

app.get('/produtos/form',function(req,res){
    res.render('produtos/form',
              {errosValidacao:{}, produto:{}});
});

app.post('/produtos',function(req,res){

    var produto = req.body;
    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('preco', 'Formato inválido').isFloat();

    var errors = req.validationErrors();
    if (errors) {
      res.render('produtos/form', {errosValidacao:errors,produto:produto});
      return;
    }

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.salva(produto,function(erros,resultados){
        res.redirect('/produtos');
    });
});


  // app.get('/produtos/remove', function() {
  //   var connection = app.infra.connectionFactory();
  //   var produtosDAO = app.infra.ProdutosDAO(connection);
  //
  //   var produto = produtosBanco.carrega(id, callback);
  //   if(produto){
  //     produtosDAO.remove(produto, callback);
  //   }
  //
  // });

}
