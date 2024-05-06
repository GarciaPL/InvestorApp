function Error({ error }) {
    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: '#ffdddd',
                color: 'red',
                textAlign: 'center',
            }}
        >
            <h1>Error during processing your request.</h1>
            {error && <pre>{error.toString()}</pre>}
        </div>
    );
}

export default Error;