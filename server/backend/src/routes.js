import { Router } from 'express';

import UserController from './app/controllers/UserController';
import MemberController from './app/controllers/MemberController';
import SessionController from './app/controllers/SessionController';
import MembershipController from './app/controllers/MembershipController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrderAnswerController from './app/controllers/HelpOrderAnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/members/:id/checkins', CheckinController.index);
routes.post('/members/:id/checkins', CheckinController.store);

routes.post('/members/:id/help-orders', HelpOrderController.store);
routes.get('/members/:id/help-orders', HelpOrderController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/members', MemberController.index);
routes.get('/members/:name', MemberController.index);
routes.post('/members', MemberController.store);
routes.put('/members/:id', MemberController.update);
routes.delete('/members/:id', MemberController.delete);

routes.get('/memberships', MembershipController.index);
routes.post('/memberships', MembershipController.store);
routes.put('/memberships/:id', MembershipController.update);
routes.delete('/memberships/:id', MembershipController.delete);

routes.get('/enrollments/:id', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', HelpOrderAnswerController.index);
routes.post('/help-orders/:id/answer', HelpOrderAnswerController.store);

export default routes;
