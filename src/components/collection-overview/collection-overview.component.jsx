import React from "react";
import "./collection-overview.styles.scss";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { useSelector } from "react-redux";
import { selectCollectionsForPrevirew } from "../../redux/shop/shop.selector";

const CollectionsOverview = () => {
	const collections = useSelector(selectCollectionsForPrevirew);
	return (
		<div className='collections-overview'>
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}
		</div>
	);
};

export default CollectionsOverview;
