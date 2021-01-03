import { Request, Response, NextFunction } from 'express';
import User from '../../entity/User';
import CrudController from '../base/CrudController';
import UserRepository from '../../repository/UserRepository';
import RouteData from '../base/RouteData';
import AutoBind from '../../core/Decorators/AutoBind';
import * as _ from 'lodash';
import NotFound from '../../core/Exceptions/NotFound';

export default class AdminUserController extends CrudController
{
    protected userRepo: UserRepository;
    
    public constructor()
    {
        super('/admin/users');
    }

    /**
     * @see Controller
     */
    protected defineRoutes(): RouteData[]
    {
        const routes = [
            new RouteData('get', 'todoes/:id', 'todoes'),
        ];

        return _.concat(routes, super.defineRoutes());
    }

    /**
     * Определение репозитория пользователя.
     * 
     * @param  number userId
     * @return Promise<void>|never
     */
    protected async defineUserRepo(userId: number): Promise<void>|never
    {
        const user = await UserRepository.findById(userId);

        if (user instanceof User) {
            this.userRepo = new UserRepository(user);
            return;
        }

        throw new NotFound('Пользователь не найден');
    }

    /**
     * Возвращает список задач пользователя.
     * 
     * @param  req Request
     * @param  res Response
     * @return Promise<Response>
     */
    @AutoBind
    public async actionTodoes(req: Request, res: Response): Promise<Response>
    {
        const userId = Number(req.params.id);
        
        await this.defineUserRepo(userId);
        
        return res.json({
            items: {
                userId: await this.userRepo.getTodoes(),
            },
        });
    }
    
    /**
     * @see CrudController
     */
    protected async list(): Promise<object[]>
    {
        return await UserRepository.all();
    }

    /**
     * @see CrudController
     */
    protected async create(req: Request): Promise<object>
    {
        return new Promise(function(resolve, reject) {
            return resolve({});
        });
    }

    /**
     * @see CrudController
     */
    protected async update(req: Request): Promise<object>
    {
        return new Promise(function(resolve, reject) {
            return resolve({});
        });
    }

    /**
     * @see CrudController
     */
    protected async delete(req: Request): Promise<boolean>
    {
        // Not implemented
        return new Promise(function(resolve, reject) {
            return resolve(true);
        });
    }
}