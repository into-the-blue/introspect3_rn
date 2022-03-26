import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITaskItem, ITaskItemSlot} from '@/types/task.type';
export class TaskItemSlotsStore extends IStore {
  name?: string = undefined;
  constructor() {
    super();
    makeObservable(this, {
      taskItem: observable,
      slots: observable,
      //
      addSlot: action.bound,
      setSlots: action.bound,
      finishSlot: action.bound,
      setTaskItem: action.bound,
    });
  }
  taskItem?: ITaskItem = undefined;
  slots: ITaskItemSlot[] = [];

  setTaskItem = (item: ITaskItem) => {
    this.taskItem = item;
  };

  setSlots = (slots: ITaskItemSlot[]) => {
    this.slots = slots;
  };

  addSlot = (slot: ITaskItemSlot) => {
    this.slots = this.slots.concat(slot);
  };

  finishSlot = (id: string) => {
    this.slots = this.slots.map(s =>
      s.id === id
        ? {
            ...s,
            finished: true,
          }
        : s,
    );
  };
  reset = () => {
    TaskItemSlotsStore.removeNamedStore(this.name!);
  };
}
