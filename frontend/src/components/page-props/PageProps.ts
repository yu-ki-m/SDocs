
import { WindowWrapperInterface     } from "./WindowWrapper";
import { RepositoryFactoryInterface } from './RepositoryFactory';
import { RouterWrapperInterface     } from './RouterWrapper'

export interface PagePropsInterface {
    windowWrapper:WindowWrapperInterface;
    repositoryFactory:RepositoryFactoryInterface;
    routerWrapper:RouterWrapperInterface;
}

export class PageProps implements PagePropsInterface {
    windowWrapper:WindowWrapperInterface;
    repositoryFactory:RepositoryFactoryInterface;
    routerWrapper:RouterWrapperInterface;
    constructor(
        windowWrapper:WindowWrapperInterface,
        repositoryFactory:RepositoryFactoryInterface,
        routerWrapper:RouterWrapperInterface
    ){
        this.windowWrapper = windowWrapper;
        this.repositoryFactory = repositoryFactory;
        this.routerWrapper = routerWrapper;
    }
}

