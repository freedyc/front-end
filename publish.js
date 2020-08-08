var ghpages = require('gh-pages');
 
ghpages.publish('.', function(err) {
    console.log(err);
});