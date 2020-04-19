const types = {
    array: "array",
    object: "object",
    undefined: "undefined",
    any: { item: "any", collection: "any[]" },
    number: { item: "number", collection: "number[]" },
    string: { item: "string", collection: "string[]" },
    boolean: { item: "boolean", collection: "boolean[]" },
    interface: {
        item: name => snakeToPaskalCase(name),
        collection: name => `${snakeToPaskalCase(name)}[]`
    }
};
const snakeToCamelCase = string =>
    `${string}`.replace(/_+.?/g, char =>
        char
            .replace("_", "")
            .charAt(0)
            .toUpperCase()
    );
const snakeToPaskalCase = string => {
    const camelCased = snakeToCamelCase(string);
    return camelCased.charAt(0).toUpperCase() + camelCased.substr(1);
};
const getType = value => {
    let type = types.undefined;
    if (value === null) {
        type = types.string.item;
    } else if (typeof value === "object") {
        if (Array.isArray(value)) {
            type = types.array;
        } else {
            type = types.object;
        }
    } else {
        type = types[typeof value] ? types[typeof value].item : typeof value;
    }
    return type;
};
const isMixed = types => {
    let mixed = false;
    if(types.length) {
        types.reduce(
            (prevValue, currentValue) =>
                (mixed = getType(prevValue) !== getType(currentValue))
        );
    }
    return mixed;
};
const hasChild = object => {
    const contentTypes = Object.values(object).map(value => getType(value));
    return (
        contentTypes.includes(getType({})) || contentTypes.includes(getType([]))
    );
};
const typeMapper = (data, collection, key) => {
    if (getType(data) === "array") {
        if (isMixed(data)) {
            collection[key] = types.any.collection;
        } else {
            const firstItem = data[0];
            if (getType(firstItem) === "object") {
                if (!collection[key]) {
                    collection[key] = [];
                }
                typeMapper(data[0], collection[key], 0);
            } else {
                collection[key] = types[getType(firstItem)].collection;
            }
        }
    } else if (getType(data) === "object") {
        Object.keys(data).forEach(index => {
            if (!collection[key]) {
                collection[key] = {};
            }
            typeMapper(data[index], collection[key], index);
        });
    } else {
        collection[key] = getType(data);
    }
};

const dtsGenerator = json => {
    const parsedJson = JSON.parse(json);
    const results = {};
    typeMapper(parsedJson, results, "root");
    return { results };
};
exports.dtsGenerator = dtsGenerator;