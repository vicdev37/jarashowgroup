import module from './module'
import jquery from 'jquery'
import 'jquery-mask-plugin'
import 'lightgallery.js'
import Swal from 'sweetalert2'


window.$ = window.jQuery = jquery;
$(document).ready(function () {
  lightGallery(document.getElementById('lightgallery'), {
    mode: 'lg-fade',
    cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)'
  });
  lightGallery(document.getElementById('lightgallery2'), {
    mode: 'lg-fade',
    cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)'
  });


  $(".tab_item").not(":first").hide();
  $(".wrapper .tab").click(function () {
    $(".wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
    $(".tab_item").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("active");
  $('.menu-icon').click(function () {
    $('.menu').toggle("active");
  });



  $('.menu-btn').on('click', function (e) {
    e.preventDefault;
    $(this).toggleClass('menu-btn_active');
    $('.menu-mobile').toggleClass('menu-mobile_active');
  });

  $('#phone').mask('+7 (000) 000-00-00');

  $(".menu, .header-button, .header-mobile_button").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });


  $('#form').on('submit', function (event) {
    event.preventDefault()
    let name = $('#name').val().trim();
    let phone = $('#phone').val().trim();


    const createHtmlForEmail = () => {
      return `<div>
          <div>
            name: <b>${name}</b>
          </div>
          <div>
            phone: <b>${phone}</b>
          </div>
        </div>`
    }

    if (phone == '') {
      $('#errorMassage').text("Введите контактные данные")
      return false;
    }
    $('#errorMassage').text('')


    const letterData = {
      to: 'justicejesus1237@gmail.com',
      subject: 'Форма заполнена',
      text: 'yo',
      html: createHtmlForEmail()
    }


    $.ajax({
      url: 'https://api.42.works/mailer',
      type: 'POST',
      cache: false,
      data: JSON.stringify(letterData),
      beforeSend: function () {
        $('.form-button').prop("disabled", true)
      },
      success: function (data) {
        if (!data) {
          Swal.fire({
            title: 'Произошла ошибка',
            text: 'Форма не может быть отправлена',
            icon: 'error',
            confirmButtonText: 'Закрыть'
          });
        } else {
          Swal.fire({
            title: 'Форма отправлена!',
            text: 'Спасибо, мы получили вашу заявку',
            icon: 'success',
            confirmButtonText: 'Закрыть'
          });
          $('#form').trigger("reset")
        }
        $('.form-button').prop("disabled", false)
      },
      contentType: "application/json; charset=utf-8",
    });
  });

});