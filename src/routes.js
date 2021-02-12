import { Router } from 'express';
import cors from 'cors';

import CompanyController from './app/controllers/CompanyController';
import EmployeeController from './app/controllers/EmployeeController';
import RoleController from './app/controllers/RoleController';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => res.json({ result: 'TEST-API' }));

// Rotas para USERS
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

// Rota para AUTH

routes.post('/login', AuthController.store);

// Rotas para companies
routes.get('/companies', CompanyController.index);

// Rotas autenticadas

routes.use(authMiddleware);
// rotas para usuario auth

routes.put('/users/:uid', UserController.update);

// ROTAS PARA COMPANY AUTH
routes.post('/companies', CompanyController.store);
routes.get('/companies/:uid', CompanyController.show);

// Rotas para EMPLOYEES AUTH
routes.post('/employees', EmployeeController.store);
routes.get('/employees', EmployeeController.index);
routes.get('/employees/:uid', EmployeeController.show);

// Rotas para ROLES AUTH
routes.post('/roles', RoleController.store);
routes.get('/roles', RoleController.index);
routes.get('/roles/:uid', RoleController.show);

export default routes;
