exports.post = async (repository, validationContract, req, res) => {
    try {
        let data = req.body;
        if (!validationContract.isValid()) {
            res.status(400).send({
                message: 'Dados invalidos na requisicao',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let result = await repository.create(data);
        res.status(201).send(result);
    } catch (err) {
        console.log('Post problem ', err);
        res.status(500).send({ message: 'Erro ao processar', error: err });
    }
};

exports.put = async (repository, validationContract, req, res) => {
    try {
        let data = req.body;
        if (!validationContract.isValid()) {
            res.status(400).send({
                message: 'Dados invalidos na requisicao',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let result = await repository.update(req.params.id, data);
        res.status(202).send(result);
    } catch (err) {
        console.log('Put problem ', err);
        res.status(500).send({ message: 'Erro ao processar', error: err });
    }

};

exports.get = async (repository, req, res) => {
    try {
        let result = await repository.getAll();
        res.status(200).send(result);
    } catch (err) {
        console.log('Get problem ', err);
        res.status(500).send({ message: 'Erro ao processar', error: err });
    }
};

exports.getById = async (repository, req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let result = await repository.getById(id);
            res.status(200).send(result);
        } else {
            res.status(400).send({ message: 'Favor informar o id' });
        }
    } catch (err) {
        console.log('Get by id problem ', err);
        res.status(500).send({ message: 'Erro ao processar', error: err });
    }
};

exports.delete = async (repository, req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let data = await repository.delete(id);
            res.status(200).send({ message: 'Registro excluido com sucesso' });
        } else {
            res.status(400).send({ message: 'Favor informar o id' });
        }
    } catch (err) {
        console.log('Delete problem ', err);
        res.status(500).send({ message: 'Erro ao processar', error: err });
    }
};
