if (typeof $ !== 'undefined') {
    const _data = [];
    $('a').each((i, el)=>{
        const obj = {};
        obj.listType=$(el).parents('.list1').find('h3').html();
        obj.titleType = $(el).parents('.g1').find('.title1').html();
        obj.href=$(el).attr('href');
        obj.title=$(el).html();
        obj.description = ""
        _data.push(obj);
    });

    // console.log(_data);
    $('#data').html(JSON.stringify(_data));
} else {
    console.warn('jQuery not loaded, genurl.js functionality disabled');
}
