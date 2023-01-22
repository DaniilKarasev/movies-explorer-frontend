import React from 'react';
import { navTab } from '../../utils/constants';
import NavTabItem from '../NavTabItem/NavTabItem';
import './NavTab.css'

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