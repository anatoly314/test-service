import { v4 as uuidv4 } from "uuid";

import { sendResourceToRegistry, getResourceFromRegistry } from "../../config/socket";

const resources = {};

export function getResourceLocally(resourceId){
    return resources[resourceId];
}

export async function getResourceRemotely(resourceId) {
    const resource = await getResourceFromRegistry(resourceId);

    return resource;
}

export function keepResourceLocally(resource) {
    const resourceId = uuidv4();
    resources[resourceId] = resource;

    return resourceId;
}

export async function keepResourceRemotely(resource) {
    const response = await sendResourceToRegistry(resource);

    return response.resourceId;
}
