import {Tags} from './Tags.view';
import {TagsController} from './Tags.controller';
import {TagsService} from './service/Tags.service';
import {TagsStore} from './store/Tags.store';
import {connect} from '@/utils';
export * from './event/Tags.event';
export {Tags, TagsController, TagsService, TagsStore};

export const TagsPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = TagsStore.getNamedStore('Tags');
    const service = TagsService.new({store, navigation});
    const controller = TagsController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(Tags);
})();
