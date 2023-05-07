import React from 'react';
import { useState, useEffect } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditProfileAvatar from './EditProfileAvatar';
import ImagePopup from './ImagePopup';
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([info, card]) => {
      setCurrentUser(info)
      setCards(card)
    }).catch((err) => {
      console.error(err);
    })
  }, [])

  function handleUpdateAvatar(newAvatar) {
    api.editProfileAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closePopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateUser(newUserInfo) {
    api.editProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closePopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closePopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((user) => (user._id === card._id ? newCard : user))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function closePopups() {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closePopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Header />   
          <Main
            cards={cards} 
            onCardClick={handleCardClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditProfileAvatar 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closePopups}
              onCloseOverlay={closeByOverlay}
              onUpdateAvatar={handleUpdateAvatar} />

            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closePopups}
              onCloseOverlay={closeByOverlay}
              onUpdateUser={handleUpdateUser} /> 

            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen} 
              onClose={closePopups}
              onCloseOverlay={closeByOverlay}
              onAddPlace={handleAddPlaceSubmit} />

            <ImagePopup 
              card={selectedCard}  
              onClose={closePopups}
              onCloseOverlay={closeByOverlay}
            />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
