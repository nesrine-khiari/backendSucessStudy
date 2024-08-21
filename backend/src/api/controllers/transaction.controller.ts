import { Transactions } from '../../api/models';
import { apiJson } from '../../api/utils/Utils';
import { NextFunction, Request, Response, Router } from 'express';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
/*exports.list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.query);
        if (req.query) {
            const data = await Transactions.find().populate('client').populate({
                path: 'formation',
                model: 'formation',
                populate: {
                    path: 'Universite',
                    model: 'university',
                    match: { nom: req.query.nom }
                },

            });
            apiJson({ req, res, data, model: Transactions });
        } else {
            const data = await Transactions.find().populate('client').populate({
                path: 'formation',
                model: 'formation',
                populate: {
                    path: 'Universite',
                    model: 'university',
                },
            });
            apiJson({ req, res, data, model: Transactions });
        }

    } catch (e) {
        next(e);
    }
}; */
exports.listRib = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let aggregationPipeline = [];

        const status = req.query.status ? req.query.status.toString() : ""; // Extract 'pays' parameter
        let query = {};
        if (status !== "") {
            // If only 'approved' is provided
            query = { status: status };
        }

        // Initial stage to match all documents
        aggregationPipeline.push({
            $match: query
        });
        // Populate client and formation fields
        aggregationPipeline.push({
            $lookup: {
                from: 'demandes', // Assuming the name of the client collection is 'clients'
                localField: 'demande',
                foreignField: '_id',
                as: 'demande'
            }
        });
        aggregationPipeline.push({
            $lookup: {
                from: 'users', // Assuming the name of the university collection is 'universities'
                localField: 'demande.User',
                foreignField: '_id',
                as: 'user',

            }
        });
        aggregationPipeline.push({
            $lookup: {
                from: 'formations', // Assuming the name of the university collection is 'universities'
                localField: 'demande.formation',
                foreignField: '_id',
                as: 'formation'
            }
        });
        aggregationPipeline.push({
            $match: {
                'type': "rib",
            }
        });
        // Execute the aggregation pipeline
        const data = await Transactions.aggregate(aggregationPipeline);

        // Send the response
        apiJson({ req, res, data, model: Transactions });
    } catch (e) {
        next(e);
    }
};
exports.UpdateStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { idtransaction } = req.params;

    try {
        const query = { _id: new ObjectId(idtransaction) };
        const updatedUniv = await Transactions.findOneAndUpdate(query, { status: req.body.status }, { new: true });
        apiJson({ req, res, data: {} });
    } catch (e) {
        next(e);
    }
};

exports.list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let aggregationPipeline = [];

        // Initial stage to match all documents
        aggregationPipeline.push({
            $match: {}
        });
        // Populate client and formation fields
        aggregationPipeline.push({
            $lookup: {
                from: 'users', // Assuming the name of the client collection is 'clients'
                localField: 'client',
                foreignField: '_id',
                as: 'client'
            }
        });

        aggregationPipeline.push({
            $lookup: {
                from: 'formations', // Assuming the name of the formation collection is 'formations'
                localField: 'formation',
                foreignField: '_id',
                as: 'formation'
            }
        });

        // Check if there are query parameters
        if (req.query) {
            // If there is a query parameter 'nom', add a match stage to filter by 'nom'
            if (req.query.nom) {
                aggregationPipeline.push({
                    $lookup: {
                        from: 'universities', // Assuming the name of the university collection is 'universities'
                        localField: 'formation.Universite',
                        foreignField: '_id',
                        as: 'university'
                    }
                });

                aggregationPipeline.push({
                    $match: {
                        'university.nom': req.query.nom
                    }
                });
            }
        }



        // Execute the aggregation pipeline
        const data = await Transactions.aggregate(aggregationPipeline);

        // Send the response
        apiJson({ req, res, data, model: Transactions });
    } catch (e) {
        next(e);
    }
};



exports.create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Transactions.create(req.body);
        apiJson({ req, res, data, model: Transactions });
    } catch (e) {
        next(e);
    }
}