import '../styles/Home.css'

function Home(){
  return(
    <div className='home-container'>
        <h1 className='h-heading'>Welcome to <span className='headi'>Transfer File.</span></h1>

        <div className='files'>
          <div className='request-container'>
            <button>Send files</button>
          </div>
        </div>
    </div>
  )
}

export default Home;