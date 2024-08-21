export { };
const mongoose = require('mongoose');
import { transformData, listData } from '../../api/utils/ModelUtils';
const statu = ['verfie', 'attente', 'refuse'];
const DemandeSchema = new mongoose.Schema(
  {
    statut: {
      type: String,
      enum: statu,
      default: 'attente'
    },
    transaction: { type: String, default: '' },
    CV: { type: String, default: '' },
    passeport: { type: String, default: '' },
    diplome: { type: String, default: '' },
    releveDeNote: { type: String, default: '' },
    motivation: { type: String, default: '' },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Universite: { type: mongoose.Schema.Types.ObjectId, ref: 'university' },
    final_certif: { type: String, default: '' },
    formation: { type: mongoose.Schema.Types.ObjectId, ref: 'formation' },
    motif: { type: String, default: '' }
  },
  { timestamps: true }
);
const ALLOWED_FIELDS = ['id', 'statut', 'User', 'formation', 'Universite', 'createdAt'];

DemandeSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

DemandeSchema.statics = {
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};

const Demande = mongoose.model('demande', DemandeSchema);
Demande.ALLOWED_FIELDS = ALLOWED_FIELDS;

module.exports = Demande;
