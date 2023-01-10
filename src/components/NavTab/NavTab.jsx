import React from 'react';
import './NavTab.css'
import { navTab } from '../../utils/constants';
import NavTabItem from '../NavTabItem/NavTabItem';

function NavTab(props) {
    return (
        <section className='navtab'>
            <ul className='navtab__list'>
                {navTab.map((navTab, index) => {
                    return (
                        <NavTabItem name={navTab.name} link={navTab.link} key={index}/>
                    )
                })}
            </ul>
        </section>
    );
}

export default NavTab;