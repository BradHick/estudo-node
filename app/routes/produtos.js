
module.exports = function(app) {
  app.get('/produtos', function(req, res) {

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err,results) {
        res.render('produtos/lista',{lista:results});
    });

    connection.end();

  });


app.get('/produtos/form', function(req, res) {
  res.render('produtos/form');
});

app.post('produtos/salva', function(req,res) {
  var produto = req.body;

  var connection = app.infra.connectionFactory();
  var produtosDAO = new app.infra.ProdutosDAO(connection);


  produtosDAO.salva(produto, function(erros, resultados) {
    res.render('produtos/lista');
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
