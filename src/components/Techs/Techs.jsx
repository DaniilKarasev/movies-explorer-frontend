import React from 'react';
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';
import TechsItem from '../TechsItem/TechsItem';
import './Techs.css'

const Techs = ({
  techsList
}) => {
  return (
    <Section sectionName='techs' sectionID="techs">
      <SectionTitle title='Технологии' className='section__title_placed_techs'/>
        <div className='techs__text-block'>
          <h3 className='techs__text-block-title'>7 технологий</h3>
          <p className='techs__text-block-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className='techs__list'>
          {techsList.map((tech, index) => {
            return (
              <TechsItem name={tech.name} key={index}/>
            )
          })}
        </ul>
    </Section>
  );
};

export default Techs;