$(function(){
  $('.js-menuButton').click(menuOpenClose);
  $('.js-menuButtonExit').click(menuOpenClose);
  $('.js-passwordHideShow').click(passwordShowHide);

  $('.js-fio').blur(validationName);
  $('.js-fio').focus(validationClass);

  $('.js-email').blur(emailValidation);
  $('.js-email').focus(validationClass);

  $('.js-login').blur(validationName);
  $('.js-login').focus(validationClass);

  $('.js-phone').keyup(phoneMask);
  $('.js-phone').blur(phoneValidation);
  $('.js-phone').focus(validationClass);

  $('.js-instagram').blur(validationName);
  $('.js-instagram').focus(validationClass);
})

// открыть и закрыть меню
function menuOpenClose(e) {
  let target = $(e.target);

  if ( target.is("input.js-menuButton")) {
    $('.menuWindow').toggleClass('showMenu');
  }
  if ( target.is("input.js-menuButtonExit")) {
    $('.menuWindow').toggleClass('showMenu');
  }
}

// Показать и скрыть пароль
function passwordShowHide(e){
  let target = $(e.target);
  if($('.js-oldPassword').attr('type') === 'password'){
    $('.js-oldPassword').attr('type','text');
    target.toggleClass('hide');
  }else {
    $('.js-oldPassword').attr('type','password');
    target.toggleClass('hide');
  }
}

//Вывод ошибки формы
function validationClass(e) {
  let target = $(`.${e.target.className}`).parent()
  if(target.attr('class').match(/inputError/)){
    target.toggleClass('inputError');
  }
  if(target.attr('class').match(/inputRight/)){
    target.toggleClass('inputRight');
  }
}

// Валидация на пустоту
function validationName(e) {
  if(e.target.value.length >0){
    $(`.${e.target.className}`).parent().toggleClass('inputRight');
  }else {
    $(`.${e.target.className}`).parent().toggleClass('inputError');
  }
}

// Маска для телефона
function phoneMask (e){
  let number = e.target.value
  let mask = '+X (XXX) XXX-XX-XX';
  let numberPhone = null;

  numberPhone = number.match(/\d+/g);
  if(!numberPhone) return '';

  numberPhone = numberPhone.join('');
  if(numberPhone.length > 11) numberPhone = numberPhone.substr(0, 11);
  numberPhone = numberPhone.split('');
  for(let key of numberPhone){
    mask = mask.replace('X', key);
  }

  let xIndex = mask.search(/\d(?=\D*$)/) +1;
  let numberMask = null;
  if(xIndex > 0){
    numberMask = mask.substr(0, xIndex)
  }else{
    numberMask = mask;
  }
  $(`.${e.target.className}`).val(numberMask);
}
// Валидация телефона
function phoneValidation(e){
  let value = e.target.value
  let phoneNumbers = value.match(/\d+/g);
  let validInfo = 0
  if(phoneNumbers){
    phoneNumbers = phoneNumbers.join('');
    if(phoneNumbers.length === 11){
      $(`.${e.target.className}`).parent().toggleClass('inputRight');
    }else{
      $(`.${e.target.className}`).parent().toggleClass('inputError');
    }
  }
}

// Валидация почты
function emailValidation(e){
  let value = e.target.value
  if(value.match(/.+@.+\..+/i) !== null){
    $(`.${e.target.className}`).parent().toggleClass('inputRight');
  }else {
    $(`.${e.target.className}`).parent().toggleClass('inputError');
  }
}

//Отправка двух форм
submitForms = function(){
  $('.js-formUserInfo').submit();
  $('.js-formUserPassword').submit();
}
