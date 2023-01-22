import React from 'react';
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css'

const AboutProject = () => {
  return (
    <Section sectionName='about' sectionID="aboutProject">
        <SectionTitle title='О проекте' />
          <div className='about__description'>
            <div className='about__text-block'>
              <h3 className='about__text-block-title'>Дипломный проект включал 5 этапов</h3>
              <p className='about__text-block-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className='about__text-block'>
              <h3 className='about__text-block-title'>На выполнение диплома ушло 5 недель</h3>
              <p className='about__text-block-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className='about__timescale'>
            <div className='about__time-block about__time-block_backend'>
              <div className='about__date-wrapper about__date-wrapper_backend'>
                <span className='about__date'>1 неделя</span>
              </div>
              <span className='about__timescale-caption'>Back-end</span>
            </div>
            <div className='about__time-block'>
              <div className='about__date-wrapper'>
                <span className='about__date '>4 неделя</span>
              </div>
              <span className='about__timescale-caption'>Front-end</span>
            </div>
        </div>
    </Section>
  );
};

export default AboutProject;