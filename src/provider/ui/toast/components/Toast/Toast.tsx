import * as React from 'react';
import { ISenderInfo } from '../../../../models/ISenderInfo';
import {INotification} from '../../../models/INotification';
import {NotificationCenterAPI} from '../../../NotificationCenterAPI';
declare var window: Window&{openfin: {notifications: NotificationCenterAPI}};

interface IToastProps {
    meta: INotification & ISenderInfo;
}

const enum ClickEvents {
    BodyClick,
    Closed
}

export function Toast(props: IToastProps){
    function clickHandler(clickEventName: ClickEvents): void {
        switch (clickEventName) {
            case ClickEvents.BodyClick: {
                window.openfin.notifications.clickHandler(props.meta);
                break;
            }
            case ClickEvents.Closed: {
                window.openfin.notifications.closeHandler(props.meta);
                fin.desktop.Notification.getCurrent().close();
                break;
            }
            default: {
                console.warn('Invalid Event Requested');
                break;
            }
        }
    }

    return (
        <div className="notification-container">
            <div className="notification-inbox" id="notification-inbox">
                <ul id="notification-inbox-list">
                    <li className="notification-item">
                        <img
                            className="notification-close-x"
                            src="image/shapes/notifications-x.png"
                            alt=""
                            onClick={() => {
                                clickHandler(ClickEvents.Closed);
                            }}
                        />
                        <div
                            className="notification-body"
                            onClick={() => {
                                clickHandler(ClickEvents.BodyClick);
                            }}
                        >
                            <div className="notification-source">
                                <img
                                    src={props.meta.icon}
                                    className="notification-small-img"
                                />
                                <span className="notification-source-text">
                                    {props.meta.name}
                                </span>
                            </div>
                            <div className="notification-body-title">
                                {props.meta.title}
                            </div>
                            <div className="notification-body-text">
                                {props.meta.body}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}