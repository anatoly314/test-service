import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const registryUri = `http://${process.env.REGISTRY_URI}/v1/resource`;

const resources = {};

export function getResourceLocally(resourceId){
    return resources[resourceId];
}

export async function getResourceRemotely(resourceId, token) {
    const config = {
        headers: {
            Authorization: token
        }
    };

    const response = await axios.get(`${registryUri}/${resourceId}`, config);
    const resource = response.data;

    return resource;
}

export function keepResourceLocally(resource) {
    const resourceId = uuidv4();
    resources[resourceId] = resource;

    return resourceId;
}

export async function keepResourceRemotely(resource, token) {
    const config = {
        headers: {
            Authorization: token
        }
    };

    const response = await axios.post(registryUri, resource, config);
    const resourceId = response.data.resourceId;

    return resourceId;
}
