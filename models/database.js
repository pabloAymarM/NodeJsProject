const sequelizeORM = require("sequelize")
const sequelizeDados = new sequelizeORM(
    'produto',
    'root',
    '',
    {
        dialect:'sqlite',
        storage:'./produto.sqlite'
    }
)

//CRIANDO TABELA
const produtoTabela = sequelizeDados.define(
    'produto_Tb',
    {
        nome:{type:sequelizeORM.STRING},
        quantidade:{type:sequelizeORM.INTEGER},
        preco:{type:sequelizeORM.DOUBLE}
    }
)

produtoTabela.sync() //sicronizar a criação da tabela no banco de dados

module.exports = produtoTabela //exportando para que outros arquivos possam usar o banco