export { };
const mongoose = require('mongoose');
import { transformData, listData } from '../../api/utils/ModelUtils';
let currency_list = [
  "DT",
  "USD", // Dollar américain
  "EUR", // Euro
  "GBP", // Livre sterling
  "JPY", // Yen japonais
  "CAD", // Dollar canadien
  "CHF", // Franc suisse
  "AUD", // Dollar australien
  "NZD", // Dollar néo-zélandais
  "CNY", // Yuan chinois
  "INR"  // Roupie indienne
];
const FormationSchema = new mongoose.Schema(
  {

    nom: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default:0 },
    duree: { type: Number, default: 0 },
    avecBac: { type: Boolean, default: false },
    Universite: { type: mongoose.Schema.Types.ObjectId, ref: 'university' },
    devise: {
      type: String, default: 'DT',
      enum: currency_list
    }


  },
  { timestamps: true }
);
const ALLOWED_FIELDS = ['id', 'nom', 'description', 'avecBac', 'Universite', 'price','devise','duree' ,'createdAt'];

FormationSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

FormationSchema.statics = {
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};


const Formation = mongoose.model('formation', FormationSchema);
Formation.ALLOWED_FIELDS = ALLOWED_FIELDS;



module.exports = Formation;
