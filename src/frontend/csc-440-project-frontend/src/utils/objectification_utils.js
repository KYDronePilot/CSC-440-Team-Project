/**
 * Convert array of instances to an object with keys of the instance IDs.
 *  - Also includes an `ids` property of an array of the IDs in their original order.
 *  - Objects must have an attribute of `id`
 * @param instances {Array} - Instances to objectify
 * @return {Object} Objectified array of instances
 */
export function objectify(instances) {
    // Create ID indexed object
    const obj = {};
    instances.reduce((objBuilder, instance) => {
        objBuilder[instance.id] = instance;
        return objBuilder;
    }, obj);

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
        return objBuilder;
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
    if (objectifiedInstances.ids === undefined)
        return [];
    return objectifiedInstances.ids.map(id => objectifiedInstances[id]);
}

/**
 * Append instance to objectified instances.
 * @param objectifiedInstances {Object} - Objectified instances
 * @param newInstance {Object} - New instance to append
 * @return {Object} Objectified instances with new one appended
 */
export function appendInstance(objectifiedInstances, newInstance) {
    objectifiedInstances[newInstance.id] = newInstance;
    objectifiedInstances.ids.push(newInstance.id);
    return objectifiedInstances;
}

/**
 * Replace instance in objectified instances.
 *  - Relies on fact that IDs are same when replacing.
 * @param objectifiedInstances {Object} - Objectified instances
 * @param newInstance {Object} - New instance to replace with
 * @return {Object} Objectified instances with replacement
 */
export function replaceInstance(objectifiedInstances, newInstance) {
    objectifiedInstances[newInstance.id] = newInstance;
    return objectifiedInstances;
}

/**
 * Remove instance from objectified instances.
 * @param objectifiedInstances {Object} - Objectified instances
 * @param removedInstance {Object} - Instance to remove
 * @return {Object} Objectified instances with instance removed
 */
export function removeInstance(objectifiedInstances, removedInstance) {
    delete objectifiedInstances[removedInstance.id];
    const i = objectifiedInstances.ids.indexOf(removedInstance.id);
    objectifiedInstances.ids.splice(i, 1);
    return objectifiedInstances;
}
