exports.dtsGenerator = json => {
    const typeMapper = (data, results = {}) => {
        Object.keys(data).forEach(key => {
            if (data[key] && Array.isArray(data[key])) {
                results[key] = typeMapper(data[key], results[key])
            } else {
                results[key] = typeof data[key];
            }
        });
        return results
    };
    return typeMapper(JSON.parse(json));
};