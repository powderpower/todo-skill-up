import { Request, Response, NextFunction } from 'express';
import CrudController from './base/CrudController';
import BadRequest from '../core/Exceptions/BadRequest';
import User from '../entity/User';
import TodoItem from '../entity/TodoItem';
import UserRepository from '../repository/UserRepository';
import TodoItemRepository from '../repository/TodoItemRepository';

export default class TodoController extends CrudController
{
    protected userRepo: UserRepository;
    
    public constructor()
    {
        super('/todo');
    }

    /**
     * Определение репозитория пользователя.
     * 
     * @param  Request req
     * @return void
     */
    protected defineUserRepo(req: Request): void
    {
        if (! (req['user'] instanceof User)) {
            throw new BadRequest('Пользователь не определен');
        }

        this.userRepo = new UserRepository(req['user']);
    }

    /**
     * @see CrudController
     */
    protected async list(req: Request): Promise<object[]>
    {
        this.defineUserRepo(req);
        
        return await this.userRepo.getTodoesByStatusGroups();
    }

    /**
     * @see CrudController
     */
    protected async create(req: Request): Promise<TodoItem>
    {
        this.defineUserRepo(req);

        const newTodo = await this.userRepo.addTodoItem(req.body.form);
        
        return newTodo;
    }

    /**
     * @see CrudController
     */
    protected async update(req: Request): Promise<object>
    {
        this.defineUserRepo(req);
        
        return new Promise(function(resolve, reject) {
            return resolve({});
        });
    }

    /**
     * @see CrudController
     */
    protected async delete(req: Request): Promise<boolean>
    {
        return await TodoItemRepository.deleteById(req.body.id);
    }

}