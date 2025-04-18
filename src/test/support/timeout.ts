import { setDefaultTimeout } from '@cucumber/cucumber';


// Set the default timeout value
setDefaultTimeout(parseInt(process.env.DEFAULT_TIMEOUT || '60000', 10));
