const NotificationCard = ({
    sended,
    content,
}) => {
    const createdTime = sended.split("T").join(" ")

    return (
        <article className="bg-secondary p-4 rounded-xl shadow-md shadow-third border border-third 200 max-w-xl mx-auto w-full">
            <header className="flex justify-center gap-3">
                <span className="font-semibold text-four">
                    Sended on: {createdTime}
                </span>
            </header>
            <main className="flex justify-center mt-2">
                <p className="text-primary-text break-all">{content}</p>
            </main>
        </article>
    );
};

export default NotificationCard;