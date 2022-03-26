import {Xeno} from './xeno';
import {IEvents} from '../types/client.type';
export const xeno = new Xeno<IEvents>();
export type TXenoType = Xeno<IEvents>;
