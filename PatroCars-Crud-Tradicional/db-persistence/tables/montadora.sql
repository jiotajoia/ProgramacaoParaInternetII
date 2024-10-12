--Criando as tabelas:

CREATE TABLE Montadora (
		id_montadora INT NOT NULL,
		nome VARCHAR(50) NOT NULL,
		pais VARCHAR(50) NOT NULL,
		CONSTRAINT PRI_CAT PRIMARY KEY(id_montadora)
);

CREATE TABLE Modelo (
		id_modelo INT NOT NULL PRIMARY KEY,
		nome VARCHAR(50) NOT NULL,
		montadora_id INT NOT NULL,
		valor_referencia INT NOT NULL,
		motorizacao INT NOT NULL,
		turbo CHAR(1) NOT NULL,
		automatico CHAR(1) NOT NULL,
		CONSTRAINT FK_MODELO FOREIGN KEY(montadora_id) REFERENCES montadora(id_montadora)
);


CREATE TABLE Veiculo (
		id_veiculo INT NOT NULL PRIMARY KEY,
		modelo_id INT NOT NULL,
		cor VARCHAR(50) NOT NULL,
		ano_fabricacao INT NOT NULL,
		ano_modelo INT NOT NULL,
		valor INT NOT NULL,
		placa VARCHAR(50) NOT NULL,
		vendido CHAR(1) NOT NULL,
		CONSTRAINT FK_VEICULO FOREIGN KEY(modelo_id) REFERENCES modelo(id_modelo)
);