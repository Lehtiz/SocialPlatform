// Establish route
const router = require("express").Router();

// Map homepage of api/users/  
router.get("/",(req,res) =>{
    res.send("Hello api user");
});

// Export route (make visible)
module.exports = router;