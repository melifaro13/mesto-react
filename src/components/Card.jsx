
export default function Card(props) {
    
    function handleCardClick() {
        props.onCardClick(props.card);
      }

    return(
    <div className="element">
        <img src={props.link} alt={props.name} className="element__img" onClick={handleCardClick} />
        <button type="button" aria-label="Удалить" className="element__delete"></button>
        <div className="element__content">
            <h2 className="element__title">{props.name}</h2>
            <div className="element__like-container">
                <button type="button" aria-label="Поставить лайк" className="element__like"></button>
                <p className="element__like-counter">{props.likes.length}</p>
            </div>
        </div>
    </div>
    )
}