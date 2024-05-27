/*const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/'); // Handle error appropriately
        }
        res.clearCookie('connect.sid'); // Ensure cookies are cleared
        res.redirect('/login'); // Redirect to the login page
    });
});


module.exports = router;*/
