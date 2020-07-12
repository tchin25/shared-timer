const functions = require("firebase-functions");
const admin = require("./admin").initialize;

// Fetches all timers from account
exports.fetchTimer = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    let userId = context.auth.uid;
    let userDoc = admin.firestore().collection("users").doc(userId);
    return userDoc
      .get()
      .then(async (doc) => {
        return doc.data().timers;
      })
      .catch((err) => console.log(err));
  } else {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }
});
