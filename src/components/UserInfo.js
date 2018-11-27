import React, { Component } from 'react';
import styles from './styles.module.css'

const UserInfo = ({user}) =>{
    return(
        <div>
            {
                user &&
                <div>
                    <img className={styles['avatar']}  src={user['avatar_url']} />
                    {user.login}
                </div>
            }
        </div>
    )
}

export default UserInfo