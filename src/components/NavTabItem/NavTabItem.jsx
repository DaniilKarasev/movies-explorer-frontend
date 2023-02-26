import React from 'react';

function NavTabItem({name='', link=''}) {
    return (
        <li className='navtab__list-item'><a href={link} className='navtab__link'>{name}</a></li>
    );
}

export default NavTabItem;