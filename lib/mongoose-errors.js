/*******************************************************************************
 * Mongoose Hapi Error Handler
 ******************************************************************************/
'use strict';

module.exports = (err) => {
    let errs = err.message.split(',');
    if(errs.length) {
        let mss = errs[0];
        if(mss) {
            return mss.split(':')[2];
        } else {
            return err.message;
        }
    } else {
        return err.message;
    }
};
