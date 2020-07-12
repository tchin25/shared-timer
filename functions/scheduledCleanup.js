const functions = require("firebase-functions");
const admin = require("./admin").initialize();

// An example of a scheduled cloud function to remove old timers
// Currently untested and not deployed
exports.scheduledCleanup = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const moment = require("moment");
    let currentTime = moment().valueOf();
    const snapshot = await admin
      .firestore()
      .collection("timers")
      .where("dueTime", "<", currentTime)
      .get();

    snapshot.forEach((doc) => {
      doc.delete();
    });
  });
