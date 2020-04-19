exports.dtsGenerator = json => {
    const typeMapper = data => {
        if (typeof data === "object") {
            let result;
            if (Array.isArray(data)) {
                result = [];
                data.forEach(value => result.push(typeMapper(value)));
            } else {
                result = {};
                Object.keys(data).forEach(key => (result[key] = typeMapper(data[key])));
            }
            return result;
        } else {
            return typeof data;
        }
    };
    const parsedJson = JSON.parse(json);
    const results = {};
    Object.keys(parsedJson).forEach(key => {
        results[key] = typeMapper(parsedJson[key]);
    });
    return results;
};