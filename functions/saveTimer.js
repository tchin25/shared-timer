const functions = require("firebase-functions");
const admin = require("./admin").initialize();

// Save a NEW timer to a user in database
// Also saves timer to an aggregated timers document
//     For future use. Useful for cleanup of expired timers while saving on document reads
exports.saveTimer = functions.https.onCall(async (data, context) => {
  console.log(data);
  if (context.auth) {
    let userId = context.auth.uid;
    let userDoc = admin.firestore().collection("users").doc(userId);
    let timerId = await admin
      .firestore()
      .collection("timers")
      .add({ subscribers: [userId], ...data })
      .then((doc) => doc.id);
    console.log(timerId);
    let dataToSave = { id: timerId, ...data };
    await userDoc
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          await userDoc.update({
            timers: [dataToSave, ...doc.data().timers],
          });
        } else {
          await userDoc.set({
            timers: [dataToSave],
          });
        }
      })
      .catch((err) => console.log(err));
    return timerId;
  } else {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }
});
