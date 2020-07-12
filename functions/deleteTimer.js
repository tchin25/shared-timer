const functions = require("firebase-functions");
const admin = require("./admin").initialize;

// Deletes timer from user document
// Also checks if timer has any other users
//     If not, delete it from timers collection as well as the aggregated timers document
exports.deleteTimer = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    let userId = context.auth.uid;
    let userDoc = admin.firestore().collection("users").doc(userId);
    // TODO: Use transactions
    return userDoc
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          // Delete timer from user
          let dataToUpdate = {
            timers: doc.data().timers.filter((timer) => timer.id !== data),
          };
          await userDoc.update(dataToUpdate);
          let timerDoc = admin.firestore().collection("timers").doc(data);
          timerDoc.get().then(async (timerDocData) => {
            if (timerDocData.exists) {
              if (context.auth) {
                // Delete user from timer
                let userId = context.auth.uid;
                let subscribersArray = timerDocData.data().subscribers;
                if (subscribersArray.indexOf(userId) !== -1) {
                  if (subscribersArray.length > 1) {
                    await timerDoc.update({
                      subscribers: admin.firestore.FieldValue.arrayRemove(
                        userId
                      ),
                    });
                  } else {
                    timerDoc.delete();
                  }
                }
              }
            }
          });
        }
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
