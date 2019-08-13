import { createSelector } from 'reselect';
import { StoreState } from '@/types';
import find from 'lodash/find';

const eventListSelector = (state: StoreState) => state.work.eventListData.list;
const eventIdSelector = (state: StoreState) => state.work.eventId;

export const eventInfoSelector = createSelector(eventIdSelector, eventListSelector,  (id, list) => find(list, item => item.id === id) || {source: {}, data: {}, libInfo: {}, info: {}, clientInfo: {}, location: {}});