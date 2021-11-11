import React from 'react';
import cn from 'classnames';
import styles from './Avatar.module.scss';

const Avatar = (props) => {
    const {src, alt, containerClassName, className, onClick} = props
    const avatarContainerClassName = containerClassName
        ? cn(styles.AvatarContainer, containerClassName)
        : styles.AvatarContainer
    const avatarClassName = className ? cn(styles.Avatar, className) : styles.Avatar

    return (
        <div className={avatarContainerClassName} onClick={onClick}>
            <img src={src} alt={alt} className={avatarClassName}/>
        </div>
    );
};


export default Avatar;