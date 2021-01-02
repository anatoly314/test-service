import express from "express";

import { authorize } from "../../middlewares/auth";
import * as controller from '../../controllers/resource.controller';

const router = express.Router();

router
  .route('/:resourceId')
  .get(authorize(), controller.get)

router
    .route('/')
    .post(authorize(), controller.create);


export default router;
