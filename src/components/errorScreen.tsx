
export default function ErrorScreen({errorMsg}: {errorMsg: string}) {
    return (
        <div>
            <p>
                {errorMsg}
            </p>
        </div>

    )
}