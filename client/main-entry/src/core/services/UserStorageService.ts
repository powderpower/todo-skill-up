import axios from '../../axios/base';
import UserIdentity from '../models/UserIdentity';
import TodoItem from '../models/TodoItem';
import TodoItemService from './TodoItemService';

export default class UserStorageLoader
{
    public static instance: UserStorageLoader;

    protected storage: Storage;

    protected wasLoaded: boolean;

    protected identity: UserIdentity;

    protected identityKeys: any[];

    protected constructor() {
        this.storage = localStorage;
        this.identity = new UserIdentity;
        this.loadIdentityKeys();
        this.fillFomStorage();
    }

    protected loadIdentityKeys(): void
    {
        this.identityKeys = this.identity.getKeys();
    }

    protected setWasLoaded (condition: boolean): void
    {
        this.wasLoaded = condition;
    }

    protected setStorageLoaded(): void
    {
        this.setWasLoaded(true);
    }

    protected setStorageNotLoaded(): void
    {
        this.setWasLoaded(false);
    }

    protected isStorageLoaded(): boolean
    {
        return this.wasLoaded === true;
    }

    protected storageNotLoaded(): boolean
    {
        return ! this.isStorageLoaded();
    }

    fillFomStorage(): void
    {
        for (const item of this.identityKeys) {
            
            this.identity.set(
                item,
                this.storage.getItem(item)
            );

        }

        this.setStorageLoaded();
    }

    public fillStorage(data: object): void
    {
        const keys = Object.keys(data);
        
        for (const key of keys) {
            this.storage.setItem(key, data[key]);
        }

        this.setStorageNotLoaded();
    }

    public getUserData(): object
    {
        if (this.storageNotLoaded()) {
            this.fillFomStorage();
        }
        
        return this.identity.getParams();
    }

    protected flushStorage(): void
    {
        this.storage.clear();
    }

    public flushData(): void
    {
        this.flushStorage();
        this.fillFomStorage();
    }

    public loadTodoItems(callback: Function|null): void
    {
        axios.get('todo/list')
        .then(result => {
            const cards = TodoItemService.createCards(result.data.items);
            
            this.identity.set('cards', cards);

            if (callback instanceof Function) {
                callback();
            }
        })
        .catch(error => {
            // TODO: Добавить хендлер
        });
    }

    public getTodoItems(): TodoItem[]
    {
        return this.identity.get('cards');
    }
    
    public static getInstance(): UserStorageLoader
    {
        if (! (this.instance instanceof this)) {
            this.instance = new this;
        }

        return this.instance;
    }
}