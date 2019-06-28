'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const repository = require('../repositories/products-repository');

exports.get = (req, res, next) => {
   repository
   .get()
    .then(data => {
       res.status(200).send(data) 
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getBySlug = (req, res, next) => {
    Product.findOne(
        { slug: req.params.slug },
        'title description price slug tags'
    )
    .then(data => {
       res.status(200).send(data) 
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description_price slug tags')
    .then(data => {
       res.status(200).send(data) 
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
    .then(data => {
       res.status(200).send(data) 
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.save().
    then(x=>{
        res.status(201).send({
            message: "Produto cadastrado com sucesso!"
        });
    })
    .catch(error => {
        res.status(400).send({
            message: "Falha ao cadastrar produto.",
            data: error
        });
    });
};

// exports.put = (req, res, next) => {
//     const id = req.params.id;
//     res.status(200).send({
//         id: id,
//         item: req.body
//     });
// };

exports.put = (req, res, next) => {
    Product
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar produto.'
        })
    });
};

exports.del = (req, res, next) => {
    Product
    .findOneAndRemove(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto deletado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao deletar produto.'
        })
    });
};