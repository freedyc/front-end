var ghpages = require('gh-pages');
 
ghpages.publish('dist', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('deploy success');
});
