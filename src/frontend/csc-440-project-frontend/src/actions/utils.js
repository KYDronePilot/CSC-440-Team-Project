/**
 * Convert array of instances to an object with keys of the instance IDs.
 *  - Also includes an `ids` property of an array of the IDs in their original order.
 *  - Objects must have an attribute of `id`
 * @param instances {Array} - Instances to objectify
 * @return {Object} Objectified array of instances
 */
export function objectify(instances) {
    console.log(`instances from objectify: ${instances}`);
    console.log(instances);
    // Create ID indexed object
    const obj = {};
    instances.reduce((objBuilder, instance) => {
        objBuilder[instance.id] = instance;
        return objBuilder;
    }, obj);
    console.log('object created: ');
    console.log(obj);

    // Add ids in original order
    obj.ids = instances.map(instance => instance.id);

    return obj;
}


/**
 * Get instances by IDs from objectified instances.
 *  - Preserves original order of instances.
 * @param objectifiedInstances {Object} - Objectified version of instances
 * @param ids {Array} - IDs to index by
 * @return {Array} Indexed instances
 */
export function indexInstances(objectifiedInstances, ids) {
    if (ids === [] || !objectifiedInstances || typeof objectifiedInstances.ids !== typeof [])
        return [];
    // Get correct order for IDs
    const idSet = ids.reduce((objBuilder, id) => {
        objBuilder[id] = null;
        return objBuilder
    }, {});
    const orderedIDs = objectifiedInstances.ids.filter(id => id in idSet);

    // Pull out instances
    return orderedIDs.map(id => objectifiedInstances[id]);
}

/**
 * Get all instances from objectified instances.
 *  - Preserves original order.
 * @param objectifiedInstances {Object} - Objectified instances
 */
export function allInstances(objectifiedInstances) {
    return objectifiedInstances.ids.map(id => objectifiedInstances[id]);
}
