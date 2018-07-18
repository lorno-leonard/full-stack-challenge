import React, { Component } from 'react';
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Pagination,
	PaginationItem,
	PaginationLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { getTrackings, syncTrackings } from '../actions/trackingActions';
import PropTypes from 'prop-types';

class TrackingList extends Component {
	componentDidMount() {
		this.props.getTrackings();
	}

	onSyncClick = () => {
		this.props.syncTrackings();
	};

	onPagerClick = page => {
		this.props.getTrackings(page);
	};

	render() {
		const { trackings, page, pages, loading, syncing } = this.props.tracking;
		return (
			<Container>
				{syncing && <h4>Syncing...</h4>}
				{!syncing && (
					<Button
						size="sm"
						className="mb-3"
						onClick={this.onSyncClick.bind(this)}
					>
						Sync
					</Button>
				)}
				{loading && <h4>Loading...</h4>}
				{trackings.length === 0 &&
					!loading &&
					!syncing && <h4>No Trackings found</h4>}
				{trackings.length > 0 &&
					!loading &&
					!syncing && (
						<div>
							<ListGroup className="mb-5">
								{trackings.map(({ _id, trackingNumber }) => (
									<ListGroupItem key={_id}>{trackingNumber}</ListGroupItem>
								))}
							</ListGroup>
							<Pagination>
								{[...Array(pages)].map((value, key) => (
									<PaginationItem key={key} active={key + 1 === page}>
										{key + 1 === page ? (
											<PaginationLink href="#">{key + 1}</PaginationLink>
										) : (
											<PaginationLink
												href="#"
												onClick={this.onPagerClick.bind(this, key + 1)}
											>
												{key + 1}
											</PaginationLink>
										)}
									</PaginationItem>
								))}
							</Pagination>
						</div>
					)}
			</Container>
		);
	}
}

TrackingList.propTypes = {
	getTrackings: PropTypes.func.isRequired,
	syncTrackings: PropTypes.func.isRequired,
	tracking: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	tracking: state.tracking
});

export default connect(
	mapStateToProps,
	{
		getTrackings,
		syncTrackings
	}
)(TrackingList);
