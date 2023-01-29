export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://media.gettyimages.com/id/138819859/photo/vintage-porsche-356-speedster.jpg?s=612x612&w=0&k=20&c=MfsegAQyJDH8ld3RaTBDTTWerUxcJuwFdHM6pQNp3ZE="
          alt=""
        />
      </div>

      <div className="texts">
        <h2>Vintage porsche 356 speedster</h2>
        <p className="info">
          <span className="author">Konrad Sokolowski</span>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="description">
          Vintage porsche 356 speedster sports car in silver gray and black red
          interior.
        </p>
      </div>
    </div>
  );
}
