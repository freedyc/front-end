var ghpages = require('gh-pages');
 
ghpages.publish('.', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('deploy success');
});
