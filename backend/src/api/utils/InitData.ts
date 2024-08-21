export { };
import { User } from '../../api/models';

const USER_1 = {
  email: 'user1@example.com',
  role: 'sousadmin',
  password: 'user111'
};
const ADMIN_USER_1 = {
  email: 'admin1@example.com',
  role: 'sousadmin',
  password: '1admin1'
};
const ADMIN_USER_2 = {
  email: 'superadmin@example.com',
  role: 'superadmin',
  password: '2admin2'
};
const ADMIN_USER_3 = {
  email: 'sousadmin@example.com',
  role: 'sousadmin',
  password: '2admin2'
};
async function setup() {

  const user1 = new User(USER_1);
  await user1.save();

  const adminUser1 = new User(ADMIN_USER_1);
  await adminUser1.save();

  const adminUser2 = new User(ADMIN_USER_2);
  await adminUser2.save();
  const adminUser3 = new User(ADMIN_USER_3);
  await adminUser3.save();
}

async function checkNewDB() {
  const user1 = await User.findOne({ email: USER_1.email });
  if (!user1) {
    console.log('- New DB detected ===> Initializing Dev Data...');
    await setup();
  } else {
    console.log('- Skip InitData');
  }
}

checkNewDB();
