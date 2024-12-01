amountInput.addEventListener("change", handleAmount);
termInput.addEventListener("change", handleTerm);
rateInput.addEventListener("change", handleRate);

calcBtn.addEventListener("click", handleCalc);
clearBtn.addEventListener("click", handleClear);

function handleAmount() {
  if (amountInput.value.trim() !== '') {
    amountInput.innerHTML += amountInput.value;
  }
}

function handleTerm() {
  if (termInput.value.trim() !== '') {
    termInput.innerHTML += termInput.value;
  }
}

function handleRate() {
  if (rateInput.value.trim() !== '') {
    rateInput.innerHTML += rateInput.value;
  }
}

document.querySelector('.input-amount').classList.add('c-blue');
document.querySelector('.input-rate').classList.add('c-blue');
document.querySelector('.input-term ').classList.add('c-blue');


let totalRate = 0; //toplam faiz
let totalRepay = 0; //toplam geri ödeme
let monthlyPay = 0; // aylık ödeme

function handleCalc() {
  if (amountInput.value === "" || termInput.value === "" || rateInput.value === "") {
    // Hata mesajlarını ve inputları kırmızıya dönüştür
    document.querySelector('.amount-icon').classList.remove('c-blue');
    document.querySelector('.amount .error-msg').style.display = 'inline';

    document.querySelector('.term-icon').classList.remove('c-blue');
    document.querySelector('.term .error-msg').style.display = 'inline';

    document.querySelector('.rate-icon').classList.remove('c-blue');
    document.querySelector('.rate .error-msg').style.display = 'inline';

    document.querySelector('.input-amount').classList.remove('c-blue');
    document.querySelector('.input-amount').classList.add('c-red');

    document.querySelector('.input-term').classList.remove('c-blue');
    document.querySelector('.input-term').classList.add('c-red');

    document.querySelector('.input-rate').classList.remove('c-blue');
    document.querySelector('.input-rate').classList.add('c-red');

    document.querySelector('.type .error-msg').style.display = 'inline';

    // Results kısmını gizle
    document.querySelector('.results').classList.add('d-none');

    // ShownTxt'yi göster
    document.querySelector('.shownTxt').classList.remove('d-none');
    document.querySelector('.shownTxt').classList.add('d-blok');
  } else {
    // Hesaplama işlemleri
    monthlyRate = Number(rateInput.value) / 100 / 12;
    totalMonthlyPayNumber = Number((termInput.value) * 12);
    monthlyPay = (Number(amountInput.value) * monthlyRate) / (1 - Math.pow((1 + monthlyRate), - totalMonthlyPayNumber));
    totalRepay = Number(monthlyPay * totalMonthlyPayNumber);
    monthlyPrice.innerText = monthlyPay.toFixed(2);
    totalPrice.innerText = totalRepay.toFixed(2);

    // Hata mesajlarını ve inputları sarıya dönüştür
    document.querySelector('.input-amount').classList.remove('c-blue');
    document.querySelector('.input-term').classList.remove('c-blue');
    document.querySelector('.input-rate').classList.remove('c-blue');

    document.querySelector('.amount .error-msg').style.display = 'none';
    document.querySelector('.term .error-msg').style.display = 'none';
    document.querySelector('.rate .error-msg').style.display = 'none';
    document.querySelector('.type .error-msg').style.display = 'none';

    document.querySelector('.input-amount').classList.add('c-yellow');
    document.querySelector('.input-term').classList.add('c-yellow');
    document.querySelector('.input-rate').classList.add('c-yellow');

    // Results'ı göster
    document.querySelector('.shownTxt').classList.add('d-none'); // shownTxt'yi gizle
    document.querySelector('.results').classList.remove('d-none'); // results'ı göster
    document.querySelector('.results').classList.add('d-blok'); // results'ı bloğa al
  }
}

function handleClear() {
  amountInput.value = "";
  termInput.value = "";
  rateInput.value = "";
  monthlyPrice.innerText = "";
  totalPrice.innerText = "";
}