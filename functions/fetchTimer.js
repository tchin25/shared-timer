const functions = require("firebase-functions");
const admin = require("./admin").initialize();

// Fetches timer
// If user is logged in, saves it to their account
exports.fetchTimer = functions.https.onCall(async (data, context) => {
  console.log(data);
  let timerDoc = admin.firestore().collection("timers").doc(data);
  return timerDoc
    .get()
    .then(async (timerDocData) => {
      if (timerDocData.exists) {
        if (context.auth) {
          let userId = context.auth.uid;
          // TODO: Use transactions
          if (timerDocData.data().subscribers.indexOf(userId) === -1) {
            // Adds user to timer
            await timerDoc.update({
              subscribers: admin.firestore.FieldValue.arrayUnion(userId),
            });
            let userDoc = admin.firestore().collection("users").doc(userId);
            await userDoc
              .get()
              .then(async (userDocData) => {
                // Adds timer to user
                if (userDocData.exists) {
                  await userDoc.update({
                    timers: [timerDocData.data(), ...userDocData.data().timers],
                  });
                } else {
                  await userDoc.set({
                    timers: [timerDocData.data()],
                  });
                }
              })
              .catch((err) => console.log(err));
          } else {
            throw new functions.https.HttpsError(
              "already-exists",
              "The timer is already in your account."
            );
          }
        }
        return timerDocData.data();
      } else {
        throw new functions.https.HttpsError(
          "not-found",
          "The timer was not found."
        );
      }
    });
});
