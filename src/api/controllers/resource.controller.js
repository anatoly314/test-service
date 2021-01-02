import httpStatus from "http-status";

import { APIError } from "../utils/APIError";
import {
  getResourceLocally,
  keepResourceRemotely,
  getResourceRemotely,
  keepResourceLocally
} from '../models/resource.model';


const isRegistryService = process.env.SERVICE_TYPE === 'registry';


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
