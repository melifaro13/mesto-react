import api from '../utils/api';
import Card from './Card'
import { useState, useEffect } from 'react';

export default function Main(props) {

    const [userInfo, setUserInfo] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([info, card]) => {
          setUserInfo(info)
          setCards(card)
        }).catch((err) => {
          console.error(err);
        })
      }, [])

    return(
    <div className="content">
        <section className="profile">
            <div className="profile__card">
                <div className="profile__avatar-container">
                    <img src={userInfo.avatar} alt={userInfo.name} className="profile__avatar" />
                    <button type="button" aria-label="Изменить аватар" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userInfo.name}</h1>
                    <button type="button" aria-label="Редактировать профиль" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__information">{userInfo.about}</p>
                </div>
            </div>
            <button type="button" aria-label="Добавить фотографию" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
        { cards.map( (card) => (
            <Card
              card={card}
              key={card._id}              
              onCardClick={props.onCardClick}
            />
          ) )          
        }    
        </section>
    </div>
    )
}