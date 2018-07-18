import axios from 'axios';
import {
	GET_TRACKINGS,
	SYNC_TRACKINGS,
	TRACKINGS_LOADING,
	TRACKINGS_SYNCING
} from './types';

export const getTrackings = page => dispatch => {
	dispatch(setTrackingsLoading());
	axios.get(`/api/trackings?page=${page}`).then(res =>
		dispatch({
			type: GET_TRACKINGS,
			payload: {
				trackings: res.data.docs,
				total: res.data.total,
				page: res.data.page,
				pages: res.data.pages
			}
		})
	);
};

export const syncTrackings = () => dispatch => {
	dispatch(setTrackingsSyncing());
	axios.post('/api/trackings/fetch').then(res => {
		dispatch({
			type: SYNC_TRACKINGS,
			payload: res.data.synced
		});
		dispatch(getTrackings());
	});
};

export const setTrackingsLoading = () => {
	return {
		type: TRACKINGS_LOADING
	};
};

export const setTrackingsSyncing = () => {
	return {
		type: TRACKINGS_SYNCING
	};
};
