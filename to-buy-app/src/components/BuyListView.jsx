export default function BuyListView() {
  return (
    <article className="buy-list-view">
      <header>
        <h1>Grocery List</h1>
        <div>
          <div>
            <span className="tag">25th of June 2025</span>{" "}
            <span className="tag">2/5</span>
          </div>
          <button className="icon-btn" data-color-var="inversed" type="button">
            X
          </button>
        </div>
      </header>
      <div>
        <form className="new-buy-item-form">
          <input
            className="input-text-n"
            type="text"
            name="text"
            placeholder="Enter a new item"
            id="new-todo-input"
          />
          <button
            className="icon-btn icon-bg-s icon-arrow-down"
            data-color-var="accent"
            type="button"
          ></button>
        </form>
      </div>
      <div className="buy-items-container">
        <ul className="card-list">
          <li className="card-list-item">
            <span className="card-text">Buy milk</span>
            <span className="tag">3 / 5</span>
            <span className="tag">2025-06-25</span>
            <button
              className="icon-btn icon-bg icon-pencil"
              type="button"
            ></button>
            <button className="icon-btn" type="button">
              X
            </button>
          </li>
          <li className="card-list-item">Buy milk</li>
          <li className="card-list-item">Buy milk</li>
        </ul>
      </div>
    </article>
  );
}
