import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITask, ITaskItem} from '@/types/task.type';
export class CreateTaskItemStore extends IStore {
  name?: string = undefined;
  constructor() {
    super();
    makeObservable(this, {
      title: observable,
      content: observable,
      paletteColors: observable,
      backgroundColor: observable,
      //
      setBackgroundColor: action.bound,
      setPaletteColors: action.bound,
      setTitle: action.bound,
      setContent: action.bound,
    });
  }
  task?: ITask = undefined;
  title: string = '';
  content: string = '';
  backgroundColor?: string = undefined;
  paletteColors: string[] = [];

  get taskItem(): Pick<ITaskItem, 'title' | 'backgroundColor' | 'content'> {
    return {
      title: this.title,
      backgroundColor: this.backgroundColor!,
      content: this.content,
    };
  }
  setTitle = (text: string) => {
    this.title = text;
  };
  setContent = (text: string) => {
    this.content = text;
  };

  setBackgroundColor = (c: string) => {
    this.backgroundColor = c;
  };

  setTask = (task: ITask) => {
    this.task = task;
  };
  setPaletteColors = (cs: string[]) => {
    this.paletteColors = cs;
  };

  reset = () => {
    CreateTaskItemStore.removeNamedStore(this.name!);
  };
}
