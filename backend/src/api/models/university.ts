
const mongoose = require('mongoose');
import { required } from 'joi';
import { transformData, listData } from '../../api/utils/ModelUtils';
const APIError = require('../../api/utils/APIError');
const httpStatus = require('http-status');



const UniversitySchema = new mongoose.Schema(
  {

    nom: { type: String, default: '' },
    fullname: { type: String, default: '' },
    logo: { type: String, default: '' },
    qrCode: { type: String },
    description: { type: String, default: '' },
    long_desc: { type: String, default: '' },
    pays: { type: String , default: '' },
    address: { type: String , default: '' },
    tel: { type: String , default: '' },
    OrganMere: { type: String , default: '' },
    approved: { type: Boolean, default: false },
    cover: {
      type: String,
      default: 'https://imgs.search.brave.com/ENLxB806L9J9FxquqSSRZb57KH8Um_NEusKSmq8Ezl4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/bGlmZXpldHRlLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8xMS8yMDIwLjEx/LjI3LTAzLjQxLWxp/ZmV6ZXR0ZS01ZmMx/MWUzMTFhYzA0LXNj/YWxlZC5qcGc'
    },
  },
  { timestamps: true }
);
const ALLOWED_FIELDS = ['id', 'nom', 'fullname', 'logo', 'description', 'long_desc', 'qrCode', 'tel', 'pays', 'OrganMere', 'cover', 'address', 'createdAt', 'approved'];

UniversitySchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

UniversitySchema.statics = {
  /**
  * Get user
  *
  * @param {ObjectId} id - The objectId of user.
  * @returns {Promise<User, APIError>}
  */
  async get(id: any) {
    try {
      let university;

      if (mongoose.Types.ObjectId.isValid(id)) {
        university = await this.findById(id).exec();
      }
      if (university) {
        return university;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};

const University = mongoose.model('university', UniversitySchema);
University.ALLOWED_FIELDS = ALLOWED_FIELDS;

module.exports = University;
