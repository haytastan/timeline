import React, { Component } from 'react';
import UserSummary from './UserSummary'
import styles from './styles.module.css'

const GITHUB_URL = "http://www.github.com/"
class SearcResult extends Component {
    handleLoadButton = () => {
        let page = this.props.page;
        page++;
        this.props.handlePage(page)
    }
    checkeventType = (event) => {
        let url;
        switch(event.type){
            case "WatchEvent":
                return(
                    <span>
                    starred <a href={GITHUB_URL + event.repo['name']}>{event.repo['name']}</a>
                    </span>
                )
            case "CreateEvent":
                return(
                    <span>
                        created a repository <a href={GITHUB_URL + event.repo['name']}>{event.repo['name']}</a>
                    </span>
                )
            case "ForkEvent":
                return(
                    <span>
                        forked&nbsp;
                        <a href={GITHUB_URL+event.payload.forkee['full_name']}>
                            {event.payload.forkee['full_name']}
                        </a> from&nbsp;&nbsp;
                        <a href={GITHUB_URL + event.repo['name']}>
                            {event.repo['name']}
                        </a>
                    </span>
                )
            case "PushEvent":
                return(
                    <span>
                        push event <a href={GITHUB_URL+event.repo['name']}>{event.repo['name']}</a>
                    </span>
                )
            case "IssuesEvent":
            url = event.payload.issue['url'].replace('https://api.github.com/repos/', GITHUB_URL)
            return(
                    <span>
                        issue activites <a href={url}>{event.repo['name']}</a>
                    </span>
                )
            case "PullRequestReviewCommentEvent":
                return(
                    <span>
                        pull request review comment <a href={GITHUB_URL+event.repo['name']}>
                            {event.repo['name']}
                        </a>
                    </span>
                )
            case "PublicEvent":
                return(
                    <span>
                        made <a href={GITHUB_URL+event.repo['name']}>
                            {event.repo['name']}
                        </a>
                        public
                    </span>
                )
            case "IssueCommentEvent":
            url = event.payload.issue['url'].replace('https://api.github.com/repos/', GITHUB_URL)
            return(
                <span>
                    commeted an issue <a href={url}>{event.repo.name}</a>
                </span>
            )
            case "MemberEvent":
                return(
                    <span>
                        member event <a href={GITHUB_URL + event.repo['name']}>{event.repo['name']}</a>
                    </span>
                )
            case "PullRequestEvent":
                return(
                    <span>
                    pull request <a href={event.repo['url']}>{event.repo['name']}</a>
                    </span>
                )
        }
        return(
            <span>
                made an activity
            </span>
        )
    }
    render() {
        const events = this.props.events
        return (
            <div>
            { events && events.map((event, i) => {
                return(
                    <div key={i} className={styles["content-div"]}>
                        <a className={styles["avatar-aligment"]} href={GITHUB_URL + event.actor['login']}>
                            <img className={styles['event-avatar']}  src={event.actor['avatar_url']}/>
                        </a>
                        <a href={GITHUB_URL + event.actor['login']}>{event.actor['login']}</a>&nbsp;
                        {this.checkeventType(event)}
                    </div>
                )
            })
            }
            </div>
        )
    }
}

export default SearcResult;
