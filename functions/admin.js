// Wrapper for admin sdk since accidentally initializing multiple times can result in errors
const admin = require("firebase-admin");
let adminInitialized = module.exports = {
    isInitialized: false,
    initialize: function() {
        if (!adminInitialized.isInitialized){
            admin.initializeApp();
            adminInitialized.isInitialized = true;
        }
        return admin;
    }
}