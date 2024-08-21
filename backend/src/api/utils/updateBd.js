export {};

const MONGO_URI = 'mongodb://localhost:27017/node-rem?authSource=admin';
const MONGO_USER = 'user';
const MONGO_PASS = 'password';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user: MONGO_USER,
      password: MONGO_PASS
    }
  })
  .then(() => {
    console.log('Successful connection with MongoDB...');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });

const UniversitySchema = new mongoose.Schema(
  {
    nom: { type: String, default: '' },
    fullname: { type: String, default: '' },
    logo: { type: String, default: '' },
    qrCode: { type: String },
    description: { type: String, default: '' },
    long_desc: { type: String, default: '' },
    pays: { type: String, default: '' },
    address: { type: String, default: '' },
    tel: { type: String, default: '' },
    OrganMere: { type: String, default: '' },
    approved: { type: Boolean, default: false },
    cover: {
      type: String,
      default:
        'https://imgs.search.brave.com/ENLxB806L9J9FxquqSSRZb57KH8Um_NEusKSmq8Ezl4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/bGlmZXpldHRlLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8xMS8yMDIwLjEx/LjI3LTAzLjQxLWxp/ZmV6ZXR0ZS01ZmMx/MWUzMTFhYzA0LXNj/YWxlZC5qcGc'
    }
  },
  { timestamps: true }
);
const University = mongoose.model('university', UniversitySchema);

async function setup() {
  const response1 = await University.updateMany({ pays: 'tunisie' }, { $set: { country: 'tunisia' } });
  const response2 = await University.updateMany({ pays: 'belgique' }, { $set: { country: 'belgium' } });
  const response3 = await University.updateMany({ pays: 'espagne' }, { $set: { country: 'spain' } });
}

async function checkNewDB() {
  console.log(response1, response2, response3);
}

checkNewDB();
