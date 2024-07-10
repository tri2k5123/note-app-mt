import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from 'react';
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '../utils/constants';
import { createClient } from 'graphql-ws';
import { Badge, Menu, MenuItem } from '@mui/material';

const client = createClient({
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT
})
const query = `subscription PushNotification {
  notification {
    message
  }
}
`

export default function PushNotification() {
    const [ invisible, setInvisible ] = useState(true);
    const [ notification, setNotification ] = useState('');

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    
    
    const handleClose = () => {
        setAnchorEl(null);
        setNotification('')
        setInvisible(true)
    }

    const handleClick = e => {
        if(notification) {
            setAnchorEl(e.currentTarget);

        }
    }


    useEffect(() => {
        (async () => {
            const onNext = (data) => {
                setInvisible(false);
                setNotification(data?.data?.notification?.message)
            }
            await new Promise((resolve, reject) => {
                client.subscribe(
                    {
                        query
                    },
                    {
                        next: onNext,
                        error: reject,
                        complete: resolve,
                    },
                );
            })
        })();
    }, []);
    return (
        <Badge color='secondary' variant='dot' invisible={invisible}>
            <NotificationsIcon onClick={handleClick}/> 
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>{notification}</MenuItem>
            </Menu>
        </Badge>
    )
}