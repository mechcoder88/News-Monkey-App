import loading from './LoadingHourglass.gif'

const Spinner = () => {
    return (
      <div className="text-center">
          <img className="my-3" src={loading} alt="Loading Plase Wait...." />  
      </div>
    )
}

export default Spinner
