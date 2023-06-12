// !GENERAL JS
// Fixed navbar
const sectionHeroEl = $('#hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      $('#navbar').removeClass('absolute');
      $('#navbar').addClass('fixed shadow bg-white');
      $('#navbar-1').removeClass('absolute bg-transparent');
      $('#navbar-1').addClass('fixed bg-white shadow');
      $('#navbarElement').addClass('text-slate-900');
      $('#navbarElement').removeClass('text-white');
      $('#logo').css('filter', 'none');
      $('#open-mobile-nav').addClass('text-gray-700');
      $('#open-mobile-nav').removeClass('text-white');
    }
    if (ent.isIntersecting) {
      $('#navbar').removeClass('fixed shadow bg-white');
      $('#navbar').addClass('absolute');
      $('#navbar-1').removeClass('fixed bg-white shadow');
      $('#navbar-1').addClass('absolute bg-transparent');
      $('#navbarElement').removeClass('text-slate-900');
      $('#navbarElement').addClass('text-white');
      $('#logo').css('filter', 'brightness(0) invert(1)');
      $('#open-mobile-nav').removeClass('text-gray-700');
      $('#open-mobile-nav').addClass('text-white');
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

obs.observe(sectionHeroEl.get(0));

// Mobile nav
$('#open-mobile-nav').click(function () {
  $('body').css('overflow', 'hidden');
  $('#mobile-nav').removeClass('hidden');
});
$('#close-mobile-nav').click(function () {
  $('body').css('overflow', 'auto');
  $('#mobile-nav').addClass('hidden');
});

// Mobile dropdown
const mobileDropdownBtn = $('#mobile-dropdown-btn');
const mobileDropdown = $('#disclosure-1');
const mobileDropdwnIcon = $('#mobileDropdownIcon');

mobileDropdownBtn.click(function () {
  mobileDropdown.toggleClass('hidden');
  if (mobileDropdwnIcon.hasClass('rotate-90')) {
    mobileDropdwnIcon.removeClass('rotate-90');
  } else {
    mobileDropdwnIcon.addClass('rotate-90');
  }
});

// !WEBBEHEER PAGE
if (window.location.pathname === '/webbeheer') {
  // Switch pricing cards
  const monthly = document.querySelector('#monthly');
  const annually = document.querySelector('#annually');
  const price = document.querySelectorAll('#price');
  const frequenty = document.querySelectorAll('#freq');

  annually.addEventListener('click', () => {
    monthly.classList.remove('bg-red-500', 'text-white');
    monthly.classList.add('text-slate-900');
    annually.classList.add('text-white', 'bg-red-500');
    frequenty.forEach((e) => {
      e.innerHTML = '/ jaar';
    });
    price.forEach((price) => {
      let annualPrice = Number(price.textContent) * 12;
      let discount = annualPrice * 0.1;
      price.innerHTML = annualPrice - discount;
    });
  });

  monthly.addEventListener('click', () => {
    monthly.classList.add('bg-red-500', 'text-white');
    monthly.classList.remove('text-slate-900');
    annually.classList.remove('text-white', 'bg-red-500');
    if (price[0].textContent !== '25') {
      price[0].textContent = '25';
      frequenty.forEach((freq) => {
        freq.innerHTML = '/ mnd';
      });
    }
    if (price[1].textContent !== '35') {
      price[1].textContent = '35';
      frequenty.forEach((freq) => {
        freq.innerHTML = '/ mnd';
      });
    }
    if (price[2].textContent !== '45') {
      price[2].textContent = '45';
      frequenty.forEach((freq) => {
        freq.innerHTML = '/ mnd';
      });
    }
  });
}

// !CONTACT PAGE

if (window.location.pathname === '/contact') {
  const checkbox = document.querySelector('#checkbox');
  const switchEl = document.querySelector('#switch');
  checkbox.addEventListener('click', () => {
    checkbox.classList.toggle('bg-red-500');
    switchEl.classList.toggle('translate-x-3.5');
  });

  const successModal = document.querySelector('#successModal');
  const errorModal = document.querySelector('#errorModal');

  const contactForm = document.querySelector('.contact-form');
  let firstName = document.querySelector('#firstName');
  let lastName = document.querySelector('#lastName');
  let company = document.querySelector('#company');
  let email = document.querySelector('#email');
  let phoneNumber = document.querySelector('#phoneNumber');
  let message = document.querySelector('#message');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let checkboxStatus = checkbox.classList.contains('bg-red-500')
      ? true
      : false;

    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      company: company.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      message: message.value,
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
      console.log(xhr.responseText);
      if (xhr.responseText === 'success' && checkboxStatus) {
        successModal.classList.remove('hidden');
        firstName.value = '';
        lastName.value = '';
        company.value = '';
        email.value = '';
        phoneNumber.value = '';
        message.value = '';
        checkbox.classList.remove('bg-red-500');
        switchEl.classList.remove('translate-x-3.5');
      } else if (!checkboxStatus) {
        return errorModal.classList.remove('hidden');
      } else {
        alert('Something went wrong!');
      }
    };

    xhr.send(JSON.stringify(formData));
  });
}
