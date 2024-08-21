import { NextFunction, Request, Response } from 'express';
// const ObjectId = mongoose.Types.ObjectId;
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const APIError = require('../../api/utils/APIError');

// const { omit } = require('lodash');
const University = require('../../api/models/university');
const Formation = require('../../api/models/Formation');
const Demande = require('../../api/models/Demande.model');


const { handler: errorHandler } = require('../middlewares/error');
import { apiJson, randomString } from '../../api/utils/Utils';
import { User } from '../models';
import { forgotPasswordEmail, sendEmail } from '../utils/MsgUtils';
const qrcode = require("qrcode");


// const { apiJson } =require ('../../api/utils/Utils');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.create = async (req: any, res: Response, next: NextFunction) => {
  const { formationId, universiteId } = req.params
  const user = req.route.meta.user;
  const { _id } = req.route.meta.user;

  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT;

  const CV = req.files.CV;
  const passeport = req.files.passeport;
  const diplome = req.files.diplome;
  const releveDeNote = req.files.releveDeNote;
  const motivation = req.files.motivation;


  let files = {}

  if (CV) {
                            
    files = { ...files, CV: `${protocol}://${host}/uploads/${req.files.CV[0].filename}` }
  } else {
    files = { ...files, CV: user.CV }
  }

  if (passeport) {
    files = { ...files, passeport: `${protocol}://${host}/uploads/${req.files.passeport[0].filename}` }
  } else {
    files = { ...files, passeport: user.passeport }
  }

  if (diplome) {
    files = { ...files, diplome: `${protocol}://${host}/uploads/${req.files.diplome[0].filename}` }
  } else {
    files = { ...files, diplome: user.diplome }
  }

  if (motivation) {
    files = { ...files, motivation: `${protocol}://${host}/uploads/${req.files.motivation[0].filename}` }
  } else {
    files = { ...files, motivation: user.motivation }
  }

  if (releveDeNote) {
    files = { ...files, releveDeNote: `${protocol}://${host}/uploads/${req.files.releveDeNote[0].filename}` }
  } else {
    files = { ...files, releveDeNote: user.releveDeNote }
  }
  try {
    const newDemande = new Demande({
      formation: formationId,
      User: _id,
      Universite: universiteId,
      statut: 'attente',
      ...files
    });
    console.log(newDemande);
    const formation = await Formation.findById(formationId)
    /* let { status } = await stripe.paymentIntents.create({
       amount: formation.price,
       currency: 'usd',
       description: formation.description,
       source: req.body.stripeToken
     });
     if (status != "succeeded") {
       return next()
     }
     console.log("status", status) */
    newDemande.transaction = formation.price
    const saveDemande = await newDemande.save();
    apiJson({ req, res, data: saveDemande, model: Demande });


  } catch (error) {
    return next(error);
  }
};


exports.changeStatus = async (req: Request, res: Response, next: NextFunction) => {
  // const { demandeId } = req.params
  const user = req.route.meta.user;
  const { statut, id_demande, motif } = req.body
  try {
    
    const demande = await Demande.findById(id_demande)
    // console.log(demande)
    // console.log(user)
    // console.log(user.Universite)
    // console.log(demande.Universite)

    // if (user.Universite != demande.Universite) {
    //   console.log("not the same")
    //   return next()
    // }
    // if (statut === 'refuse' || statut === 'verfie') {
    //   console.log("not as i need")
    //   return next()
    // }
    demande.statut = statut
    demande.motif = motif
    await demande.save();
    res.status(httpStatus.CREATED);
    res.json(demande.transform());

  } catch (error) {
    return next(error);
  }
};


exports.getAllDemande = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { universityId } = req.params;
    req.query = { ...req.query, Universite: new ObjectId(universityId) }; // append to query (by userId) to final query

    // const demandes = (await Demande.list(req)).transform(req);
    const demandes = await Demande.find({ ...req.query, Universite: new ObjectId(universityId) }).populate("User").populate("formation")
    apiJson({ req, res, data: demandes, model: Demande });
  } catch (e) {
    next(e);
  }
}
exports.getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const demandes = (await Demande.list(req)).transform(req);
    const demandes = await Demande.find().populate("User")
    apiJson({ req, res, data: demandes, model: Demande });
  } catch (e) {
    next(e);
  }
}
exports.getOneDemande = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { demandeId } = req.params;
    const demande = (await Demande.get(demandeId)).transform(req);
    apiJson({ req, res, data: demande, model: Demande });
  } catch (e) {
    next(e);
  }
}

// 6422f765a960c016d8a1ea5f
// 6422f765a960c016d8a1ea5f