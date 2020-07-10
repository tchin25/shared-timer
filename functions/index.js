const functions = require("firebase-functions");

const admin = require("firebase-admin");
const moment = require("moment");

admin.initializeApp();

// Save timer to a user in database
// Also saves timer to an aggregated timers document
//     For future use. Useful for cleanup of expired timers while saving on document reads
exports.saveTimer = functions.https.onCall(async (data, context) => {
  if (context.auth) {

  } else {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
});

// Deletes timer from user document
// Also checks if timer has any other users
//     If not, delete it from timers collection as well as the aggregated timers document
exports.deleteTimer = functions.https.onCall(async (data, context) => {
    if (context.auth) {
      
    } else {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }
});

// Fetches timer
exports.fetchTimer = functions.https.onCall(async (data, context) => {});
