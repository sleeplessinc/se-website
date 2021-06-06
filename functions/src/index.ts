import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
import * as nodemailer from 'nodemailer';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: '501c3forse@gmail.com',
    pass: '<smtp-password>',
  },
});

const defaultUserCount = 20;

interface IUserClaims {
  admin?: boolean;
  editor?: boolean;
}

interface IEmail {
  email: string;
  subject: string;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUserClaim = (object: any): object is IUserClaims => {
  return 'admin' in object || 'editor' in object;
};

export const getUsers = functions.https.onCall((data, context) => {
  if (context.auth?.token.admin !== true) {
    throw new functions.https.HttpsError('permission-denied', 'Not authorized');
  }

  const count = !('count' in data.body) ? defaultUserCount : data.body['count'];
  const pageToken = !('pageToken' in data.body) ? undefined : (data.body['pageToken'] as string);
  const mapUsers = (users: admin.auth.UserRecord[]) => {
    return users.map((userResults) => {
      const user = { email: userResults.email, isAdmin: false, isEditor: false };
      if (userResults.customClaims) {
        user.isAdmin = userResults.customClaims['admin'];
        user.isEditor = userResults.customClaims['editor'];
      }
      return user;
    });
  };

  admin
    .auth()
    .listUsers(count, pageToken)
    .then((result) => {
      return { users: mapUsers(result.users), pageToken: result.pageToken };
    })
    .catch((error) => {
      console.log('Error', error);
      throw new functions.https.HttpsError('unknown', error.toString());
    });
});

exports.sendMail = functions.https.onCall((data: IEmail) => {
  if (!(typeof data.email === 'string') || data.email.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'No email address');
  }
  if (!(typeof data.subject === 'string') || data.subject.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'No subject line');
  }
  if (!(typeof data.message === 'string') || data.message.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'No message body');
  }

  const getTemplate = admin.firestore().collection('email').doc('templates').get();
  const getAddress = admin.database().ref('settings/contactAddress').once('value');
  const all = Promise.all([getTemplate, getAddress]);

  // returning result
  return all
    .then(async (result) => {
      const template = result[0].data();
      const address = result[1].val() as string;
      if (!template || !address) {
        console.error(new Error('Could not read from database'));
        throw new Error('Could not read from database');
      }

      const content = data.message
        .split(/\n/)
        .map((item) => {
          return `<p style="margin-bottom:1.5em">${item}</p>`;
        })
        .join('');

      const html = (template['contact-us'] as string)
        .replace('{{email}}', data.email)
        .replace('{{subject}}', data.subject)
        .replace('{{message}}', content);

      const mailOptions = {
        from: data.email,
        to: address,
        subject: data.subject,
        html: html,
      };

      return transporter.sendMail(mailOptions);
    })
    .then((result) => {
      return { result };
    })
    .catch((error: Error) => {
      console.error(error);
      throw new functions.https.HttpsError('unknown', 'Failed to send email', error);
    });
});

export const setClaim = functions.https.onCall((data, context) => {
  if (context.auth?.token.admin !== true) {
    throw new functions.https.HttpsError('permission-denied', 'Not authorized');
  }

  if (!(typeof data.email === 'string') || data.email.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'No email address');
  }

  if (context.auth.token.email === data.email) {
    throw new functions.https.HttpsError('permission-denied', 'Cannot modify own permissions');
  }

  let claim: IUserClaims = {};

  if (isUserClaim(data.claim)) {
    claim = data.claim;
  }

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      if (!user) {
        throw new functions.https.HttpsError('not-found', 'User not found');
      }

      admin.auth().setCustomUserClaims(user.uid, claim);
    })
    .then(() => {
      return claim;
    })
    .catch((error) => {
      console.log('Error', error);
      throw new functions.https.HttpsError('unknown', 'Unknown error');
    });
});
