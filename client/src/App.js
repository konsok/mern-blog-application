import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo">Porsche Blog</a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a> 
        </nav>
      </header>

      <div className="post">
        <div className="image">
          <img src="https://media.gettyimages.com/id/138819859/photo/vintage-porsche-356-speedster.jpg?s=612x612&w=0&k=20&c=MfsegAQyJDH8ld3RaTBDTTWerUxcJuwFdHM6pQNp3ZE=" alt="" />
        </div>
        
        <div className="texts">
          <h2>Vintage porsche 356 speedster</h2>
          <p className="info">
            <span className="author">Konrad Sokolowski</span>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="description">Vintage porsche 356 speedster sports car in silver gray and black red interior.</p>
        </div>
        
      </div>
      <div className="post">
        <div className="image">
          <img src="https://media.gettyimages.com/id/53272174/photo/vintage-porsche.jpg?s=612x612&w=0&k=20&c=Jsn7cjvw8cWCZCXtTDOdh26wUZTHUqoziHWvZ1rswKE=" alt="" />
        </div>
        
        <div className="texts">
          <h2>Vintage Porsche</h2>
          <p className="info">
            <span className="author">Konrad Sokolowski</span>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="description">UNITED STATES - CIRCA 1950s: Vintage Porsche.</p>          
        </div>
      </div>
      <div className="post">
        <div className="image">
          <img src="https://images.unsplash.com/photo-1611651338412-8403fa6e3599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60" alt="" />
        </div>
        
        <div className="texts">
          <h2>Porsche 911 turbo S</h2>
          <p className="info">
            <span className="author">Konrad Sokolowski</span>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="description">2021 Porsche 911 turbo S in the rain</p>
        </div>
      </div>
    </main>
  );
}

export default App;
