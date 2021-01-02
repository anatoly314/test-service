import express from "express";
import { authorize } from "../../middlewares/auth";
import * as controller from '../../controllers/resource.controller';

const router = express.Router();

router
  .route('/')
  .get(authorize(), controller.get)
  .post(authorize(), controller.create);



export default router;
