exports.dtsGenerator = json => {
    const results = {};
    const generator = data => {
        Object.keys(data).forEach(key => {
            results[key] = typeof data[key]
        })
    };
    generator(JSON.parse(json));
    return results
};