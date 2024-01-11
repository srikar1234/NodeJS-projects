// Data validation: Checking for constraints in the data when saving
// Data sanitation: cleaning up data before saving
// Validation: npm library-> npm validator
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')