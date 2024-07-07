import { ErrorInterface } from "./types/Types"

const Error = ({ errorMessage }: ErrorInterface) => {
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
      {errorMessage && <pre>{errorMessage.toString()}</pre>}
    </div>
  )
}

export default Error
