import React from 'react';
import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

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
    <div className="page">
        <Header />   
        <Main 
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
        />
        <Footer />

        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onCloseOverlay={closeByOverlay}
          name={'edit-avatar'}
          title={'Обновить аватар'}
          form={'editAvatarForm'} 
          buttonText={'Сохранить'}  
          >
            <input
                  type="url"
                  name="avatar"
                  className="form__info form__info_type_avatar"
                  id="avatar"
                  required
                  placeholder='Ссылка на аватар'
            />
              <span className="avatar-error form__info-error"></span>
          </PopupWithForm>

          <PopupWithForm 
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onCloseOverlay={closeByOverlay}
            name={'edit-profile'}
            title={'Редактировать профиль'}
            form={'editProfileForm'}
            buttonText={'Сохранить'}
            >
              <input
                    type="text"
                    name="name"
                    className="form__info form__info_type_name"
                    id="name"
                    required
                    placeholder='Имя'
                    minLength="2"
                    maxLength="40"
              />
              <span className="name-error form__info-error"></span>
              <input
                    type="text"
                    name="about"
                    className="form__info form__info_type_job"
                    id="job"
                    required
                    placeholder='О себе'
                    minLength="2"
                    maxLength="200"
              />
              <span className="job-error form__info-error"></span>
          </PopupWithForm>

          <PopupWithForm 
            isOpen={isAddPlacePopupOpen}
            onClose={closePopups}
            onCloseOverlay={closeByOverlay}
            name={'add-card'}
            title={'Новое место'}
            form={'addCardForm'}
            buttonText={'Создать'}
          >
              <input
                    type="text"
                    name="place"
                    className="form__info form__info_type_place"
                    id="place"
                    required
                    placeholder='Название'
                    minLength="2"
                    maxLength="20"
              />
              <span className="place-error form__info-error"></span>
              <input
                    type="url"
                    name="link"
                    className="form__info form__info_type_link"
                    id="link"
                    required
                    placeholder='Ссылка на картинку'
              />
              <span className="link-error form__info-error"></span>
            </PopupWithForm>

          <ImagePopup 
            card={selectedCard}  
            onClose={closePopups}
            onCloseOverlay={closeByOverlay}
          />
    </div>
  );
}

export default App;
