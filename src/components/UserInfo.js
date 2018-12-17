import React, { Component } from 'react';
import styles from './styles.module.css'

const UserInfo = ({user}) =>{
    return(
        <div className={"row"}>
            {
                user &&
                <div className={"col s3"}>
                    <img className={styles['avatar']}  src={user['avatar_url']} />
                    <div>
                        {user.login}
                    </div>
                </div>
            }
        </div>
    )
}

export default UserInfo