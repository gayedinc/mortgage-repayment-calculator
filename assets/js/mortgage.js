calcBtn.addEventListener("click", handleCalc);
clearBtn.addEventListener("click", handleClear);

// başlangıçta tüm input alanlarına c-blue sınıfı ekliyorum
document.querySelector('.input-amount').classList.add('c-blue');
document.querySelector('.input-rate').classList.add('c-blue');
document.querySelector('.input-term ').classList.add('c-blue');

let totalRate = 0; //toplam faiz
let totalRepay = 0; //toplam geri ödeme
let monthlyPay = 0; // aylık ödeme

function handleCalc() {
  let isValid = true; // başlangıçta tüm inputlar geçerli kabul edilecek

  // amount input validasyonu
  if (amountInput.value === "" || amountInput.value === "0") {
    document.querySelector('.amount-icon').classList.remove('c-blue');
    document.querySelector('.amount .error-msg').style.display = 'inline';
    document.querySelector('.amount .error-msg').textContent = amountInput.value === "0" ? "Can't be zero" : "This field is required";
    document.querySelector('.input-amount').classList.remove('c-blue');
    document.querySelector('.input-amount').classList.add('c-red');
    isValid = false;
  } else {
    document.querySelector('.amount-icon').classList.remove('c-blue');
    document.querySelector('.amount .error-msg').style.display = 'none';
    document.querySelector('.input-amount').classList.remove('c-red');
    document.querySelector('.input-amount').classList.add('c-yellow');
  }

  // term input validasyonu
  if (termInput.value === "" || termInput.value === "0") {
    document.querySelector('.term-icon').classList.remove('c-blue');
    document.querySelector('.term .error-msg').style.display = 'inline';
    document.querySelector('.term .error-msg').textContent = termInput.value === "0" ? "Can't be zero" : "This field is required";
    document.querySelector('.input-term').classList.remove('c-blue');
    document.querySelector('.input-term').classList.add('c-red');
    isValid = false;
  } else {
    document.querySelector('.term-icon').classList.remove('c-blue');
    document.querySelector('.term .error-msg').style.display = 'none';
    document.querySelector('.input-term').classList.remove('c-red');
    document.querySelector('.input-term').classList.add('c-yellow');
  }

  // rate input validasyonu
  if (rateInput.value === "" || rateInput.value === "0") {
    document.querySelector('.rate-icon').classList.remove('c-blue');
    document.querySelector('.rate .error-msg').style.display = 'inline';
    document.querySelector('.rate .error-msg').textContent = rateInput.value === "0" ? "Can't be zero" : "This field is required";
    document.querySelector('.input-rate').classList.remove('c-blue');
    document.querySelector('.input-rate').classList.add('c-red');
    isValid = false;
  } else {
    document.querySelector('.rate-icon').classList.remove('c-blue');
    document.querySelector('.rate .error-msg').style.display = 'none';
    document.querySelector('.input-rate').classList.remove('c-red');
    document.querySelector('.input-rate').classList.add('c-yellow');
  }

  // mortgage type kontrolü
  const mortgageTypeChecked = document.querySelector('input[name="option"]:checked');
  if (!mortgageTypeChecked) {
    document.querySelector('.type .error-msg').style.display = 'inline';
    isValid = false;
  } else {
    document.querySelector('.type .error-msg').style.display = 'none';
  }

  // eğer her input değeri geçerliyse hesaplama yapılacak
  if (isValid) {
    // hesaplama işlemleri
    monthlyRate = Number(rateInput.value) / 100 / 12;
    totalMonthlyPayNumber = Number(termInput.value) * 12;
    monthlyPay = (Number(amountInput.value) * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -totalMonthlyPayNumber));
    totalRepay = Number(monthlyPay * totalMonthlyPayNumber);
    monthlyPrice.innerText = monthlyPay.toFixed(2);
    totalPrice.innerText = totalRepay.toFixed(2);

    // hata mesajlarını gizle ve inputları sarıya döndür
    document.querySelector('.amount .error-msg').style.display = 'none';
    document.querySelector('.term .error-msg').style.display = 'none';
    document.querySelector('.rate .error-msg').style.display = 'none';
    document.querySelector('.type .error-msg').style.display = 'none';

    // `c-blue` sınıfını kaldır ve `c-yellow` ekle
    document.querySelector('.input-amount').classList.remove('c-blue');
    document.querySelector('.input-term').classList.remove('c-blue');
    document.querySelector('.input-rate').classList.remove('c-blue');

    document.querySelector('.input-amount').classList.add('c-yellow');
    document.querySelector('.input-term').classList.add('c-yellow');
    document.querySelector('.input-rate').classList.add('c-yellow');

    // shownTxt'yi gizle ve sonuçları göster
    document.querySelector('.shownTxt').classList.add('d-none');
    document.querySelector('.results').classList.remove('d-none');
    document.querySelector('.results').classList.add('d-blok');

    // "Clear All" butonunu "Return" butonuna çevirmek için
    const clearBtn = document.querySelector('#clearBtn'); // Clear butonu seçtim
    clearBtn.innerHTML = 'Return'; // buton metnini 'Return' olarak değiştirdim

    // return butonuna tıklandığında ana sayfaya yönlendirmek için
    clearBtn.onclick = function () {
      window.location.href = '/';
    };
  } else {
    // geçersizse sonuçları gizle
    document.querySelector('.results').classList.add('d-none');
  }
}



function handleClear() {
  // tüm input değerlerini boşalt
  amountInput.value = "";
  termInput.value = "";
  rateInput.value = "";
  monthlyPrice.innerText = "";
  totalPrice.innerText = "";

  // hata mesajlarını gizlemek için
  document.querySelector('.amount .error-msg').style.display = 'none';
  document.querySelector('.term .error-msg').style.display = 'none';
  document.querySelector('.rate .error-msg').style.display = 'none';
  document.querySelector('.type .error-msg').style.display = 'none';

  // temizleme sonrası inputlara c-blue sınıfı ekle
  document.querySelector('.input-amount').classList.add('c-blue');
  document.querySelector('.input-rate').classList.add('c-blue');
  document.querySelector('.input-term').classList.add('c-blue');

  // radio butonlarının seçimini kaldırmak için
  const radioButtons = document.querySelectorAll('input[name="option"]');
  radioButtons.forEach(button => {
    button.checked = false;
  });
}
