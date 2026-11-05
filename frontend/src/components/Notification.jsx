const Notification = ({notification}) => {

    if (!notification) {
        return null;
    }

    return (
        <div style={{
            color: 'red',
        }}>{notification}</div>
    )

}

export default Notification;