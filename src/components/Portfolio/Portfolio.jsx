import React from 'react';
import Section from '../Section/Section';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import './Portfolio.css'

const Portfolio = ({
	projectsList
}) => {
	return (
		<Section sectionName='portfolio'>
			<h3 className='portfolio__title'>Портфолио</h3>
			<ul className='portfolio__list'>
				{projectsList.map((project, index) => {
					return (
						<PortfolioItem name={project.title} link={project.url} key={index} />
					)
				})}

			</ul>
		</Section>
	);
};

export default Portfolio;