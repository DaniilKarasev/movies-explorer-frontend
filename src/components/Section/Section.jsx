import React from 'react';

import './Section.css'

const Section = ({
	children,
	sectionName,
	sectionID
}) => {
	return (
		<section className={`section  ${sectionName && `${sectionName}`}`} id={sectionID}>
			{children}
		</section>
	);
};

export default Section;