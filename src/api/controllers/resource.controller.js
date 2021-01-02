import httpStatus from "http-status";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import { APIError } from "../utils/APIError";

const registryUri = `http://${process.env.REGISTRY_URI}/v1/resource`;


/**
 * If REGISTRY_HOST provided this is regular service, otherwise it's registry which consolidates all resources
 * @type {boolean}
 */
const isRegistryService = process.env.SERVICE_TYPE === 'registry';
const resources = {};

function getResourceLocally(resourceId){
  return resources[resourceId];
}

async function getResourceRemotely(resourceId, token) {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.get(`${registryUri}/${resourceId}`, config);
  const resource = response.data;

  return resource;
}

function keepResourceLocally(resource) {
  const resourceId = uuidv4();
  resources[resourceId] = resource;

  return resourceId;
}

async function keepResourceRemotely(resource, token) {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.post(registryUri, resource, config);
  const resourceId = response.data.resourceId;

  return resourceId;
}

/**
 * Get resource
 * @public
 */
export const get = async (req, res, next) => {

  try {
    const resourceId = req.params.resourceId;

    let resource;
    if (isRegistryService) {
      resource = getResourceLocally(resourceId);
    } else {
      const token = req.headers.authorization;
      resource = await getResourceRemotely(resourceId, token);
    }

    if (!resource) {
      throw new APIError({
        message: `Resource with ${resourceId} not found`,
        status: httpStatus.NOT_FOUND
      });
    }

    return res.json(resource);
  } catch (e) {
    return next(e);
  }


}

export const create = async (req, res, next) => {
  try {
    const resource = req.body;
    resource._createdAt = new Date();
    let resourceId;
    if (isRegistryService) {
      resourceId = keepResourceLocally(resource);
    } else {
      const token = req.headers.authorization;
      resourceId = await keepResourceRemotely(resource, token);
    }
    res.status(httpStatus.CREATED);
    res.json({
      resourceId: resourceId
    });
  } catch (error) {
    next(error);
  }
};
