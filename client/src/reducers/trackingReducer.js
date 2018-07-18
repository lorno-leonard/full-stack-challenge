import {
	GET_TRACKINGS,
	SYNC_TRACKINGS,
	TRACKINGS_LOADING,
	TRACKINGS_SYNCING
} from '../actions/types';

const initialState = {
	trackings: [],
	synced: 0,
	loading: false,
	syncing: false,
	total: 0,
	page: 1,
	pages: 0
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TRACKINGS:
			return {
				...state,
				trackings: action.payload.trackings,
				total: action.payload.total,
				page: +action.payload.page,
				pages: +action.payload.pages,
				loading: false
			};
		case SYNC_TRACKINGS:
			return {
				...state,
				synced: action.payload,
				syncing: false
			};
		case TRACKINGS_LOADING:
			return {
				...state,
				loading: true
			};
		case TRACKINGS_SYNCING:
			return {
				...state,
				syncing: true
			};
		default:
			return state;
	}
}
