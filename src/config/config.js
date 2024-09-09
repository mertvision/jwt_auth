/**
 * This file contains the function that performs the configuration of the dotenv module, 
 * which is necessary for environment variables to work.
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const dotenv = require("dotenv");

const initServerConfigurations = () => {
    dotenv.config();
};

module.exports = initServerConfigurations;