// Функция форматирования ввода
function formatInput(inputElement) {
  inputElement.addEventListener("input", (event) => {
    const input = event.target.value.replace(/\s+/g, ""); // Убираем пробелы
    if (!isNaN(input)) {
      event.target.value = Number(input).toLocaleString("ru-RU"); // Форматируем
    }
  });
}

// Привязка форматирования ввода
const costYuanInput = document.getElementById("costYuan");
const exchangeRateInput = document.getElementById("exchangeRate");
const weightInput = document.getElementById("weight");

formatInput(costYuanInput);
formatInput(exchangeRateInput);
formatInput(weightInput);

// Основная функция расчета
function calculate() {
  const costYuanRaw = costYuanInput.value.replace(/\s+/g, ""); // Убираем пробелы из ввода
  const exchangeRateRaw = exchangeRateInput.value.replace(/\s+/g, "");
  const weightRaw = weightInput.value.replace(/\s+/g, "");

  const costYuan = parseFloat(costYuanRaw);
  const exchangeRate = parseFloat(exchangeRateRaw);
  const weightGrams = parseFloat(weightRaw);

  // Проверка корректности данных
  if (isNaN(costYuan) || costYuan <= 0) {
    alert("Введите корректную себестоимость товара в юанях!");
    return;
  }
  if (isNaN(exchangeRate) || exchangeRate <= 0) {
    alert("Введите корректный курс юаня к тенге!");
    return;
  }
  if (isNaN(weightGrams) || weightGrams <= 0) {
    alert("Введите корректный вес товара в граммах!");
    return;
  }

  // Расчеты
  const costInTenge = costYuan * exchangeRate; // Себестоимость в тенге
  const shippingCostPerGram = 1740 / 1000; // Стоимость доставки за 1 грамм
  const shippingCost = Math.floor(weightGrams * shippingCostPerGram); // Стоимость доставки
  const totalCost = costInTenge + shippingCost; // Общая стоимость

  // Отображение базовых результатов
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Себестоимость товара в тенге: <b>${costInTenge.toLocaleString(
      "ru-RU"
    )} ₸</b></p>
    <p>Стоимость доставки (${shippingCostPerGram.toFixed(
      2
    )} ₸/г): <b>${shippingCost.toLocaleString("ru-RU")} ₸</b></p>
    <p>Общая стоимость товара: <b>${totalCost.toLocaleString("ru-RU")} ₸</b></p>
    <label for="markup">Введите процент наценки:</label>
    <input id="markup" type="text" placeholder="Например, 20" />
    <button id="applyMarkupButton">Применить наценку</button>
  `;

  // Добавление обработчика для кнопки "Применить наценку"
  document.getElementById("applyMarkupButton").addEventListener("click", () => {
    const markupInput = document
      .getElementById("markup")
      .value.replace(/\s+/g, "");
    const markup = parseFloat(markupInput);

    if (isNaN(markup) || markup < 0) {
      alert("Введите корректный процент наценки!");
      return;
    }

    // Рассчитываем стоимость с наценкой
    const markupAmount = (totalCost * markup) / 100;
    const finalCost = totalCost + markupAmount;

    resultDiv.innerHTML += `
      <p>Наценка (${markup.toFixed(2)}%): <b>${markupAmount.toLocaleString(
      "ru-RU"
    )} ₸</b></p>
      <p>Итоговая стоимость товара: <b>${finalCost.toLocaleString(
        "ru-RU"
      )} ₸</b></p>
    `;
  });
}

// Связываем кнопку с функцией расчета
document.getElementById("calculateButton").addEventListener("click", calculate);
