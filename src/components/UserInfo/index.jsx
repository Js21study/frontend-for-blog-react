import React from 'react';
import styles from './UserInfo.module.scss';
import { Link } from 'react-router-dom';

export const UserInfo = ({ _id, avatarUrl, fullName, additionalText }) => {
  const id = _id
  return (
    <div className={styles.root}>
     <Link to={`/person/${id}`}> <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} /></Link>
      <div className={styles.userDetails}>
      <Link to={`/person/${id}`}><span className={styles.userName}>{fullName}</span></Link>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
