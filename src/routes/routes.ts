import { Router } from 'express';
import v1 from './v1/index.routes';

const routes = Router();

routes.use('/v1', v1);

export default routes;
