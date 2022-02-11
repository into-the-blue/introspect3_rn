import {TagsStore} from '../store/Tags.store';
export type TagsEvents = {
  TAGS_INITIAL_DATA: Pick<TagsStore, 'count'>;
};
