const express = require("express")
const handlebars = require("express-handlebars")
const produtoTabela = require('./models/database')
const app = express()
const porta = 3000

//CONFIGURANDO HANDLEBARS PARA EXECUTAR O HTML
app.engine('handlebars', handlebars.engine({extended:true}))
app.set('view engine', 'handlebrs')

//CONFIGURANDO EXPRESS PARA RECEBER DADOS DO FORMULÁRIO
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//CONFIGURAR ROTAS
app.get("/", async function(req, res){
    let resultado = await produtoTabela.findAll() //Coletando dados da tabela
    if(resultado){
        console.log(resultado)
        res.render('index.handlebars', {dados: resultado})
    }else{
        console.log("Nenhum dado a ser exibido.")
    }
})

app.get("/cadastro", function(req, res){
    res.render('cadastro.handlebars')
})

app.post("/armazenar", async function(req, res){
    let resultado = await produtoTabela.create({
        //CAMINHO DE CADA UM
        nome: req.body.nome,
        quantidade: req.body.quantidade,
        preco: req.body.preco
    })

    //VERIFICANDO SE 'resultado' POSSUI ALGUM CONTEÚDO
    if(resultado){
        console.log("Dados cadastrados com sucesso.")
        res.redirect("/")
    }else{
        console.log("Houve um erro ao tentar cadastrar os dados.")
    }
    //res.json(req.body) //json é uma anotação, que faz o transporte de tecnologias diferentes como um mini banco de dados;
    //req.body pega os dados que vem do formulário.
})

app.get("/excluir/:id", async function(req, res){
    let resultado = await produtoTabela.destroy({
        where:{id:req.params.id} //params porque o id ver do parametro, se o id viesse do site, seria body
    })

    if(resultado){
        console.log("Produto apagado com sucesso.")
    }else{
        console.log("Erro ao apagar o produto.")
    }
    res.redirect("/")
})


//EXECUTANDO O SERVIDOR
app.listen(porta, function(){
    console.log(`Servidor ativo na porta ${porta}`)
})